import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    // Verify admin access
    const auth = await authCurrentUserv2();
    if (!auth || auth.role !== USER_ROLE_ENUMS.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { confirmReset } = await req.json();
    
    if (confirmReset !== "DELETE_ALL_TRANSACTIONS") {
      return NextResponse.json({ 
        error: "Please confirm by sending confirmReset: 'DELETE_ALL_TRANSACTIONS'" 
      }, { status: 400 });
    }

    console.log("Starting data reset...");

    // Collections to clear
    const collectionsToReset = [
      "transactions",
      "orders", // if you have a separate orders collection
      "pregenerated-cards" // to clean up reserved cards
    ];

    const results = {
      deletedCounts: {} as Record<string, number>,
      errors: [] as string[]
    };

    // Delete all documents in each collection
    for (const collectionName of collectionsToReset) {
      try {
        const collectionRef = collection(firebaseDb, collectionName);
        const snapshot = await getDocs(collectionRef);
        
        if (snapshot.empty) {
          results.deletedCounts[collectionName] = 0;
          continue;
        }

        // Use batched deletes for better performance
        const batchSize = 500;
        let batch = writeBatch(firebaseDb);
        let operationCount = 0;
        let totalDeleted = 0;

        for (const docSnapshot of snapshot.docs) {
          batch.delete(docSnapshot.ref);
          operationCount++;
          totalDeleted++;

          // Commit batch when it reaches the size limit
          if (operationCount === batchSize) {
            await batch.commit();
            batch = writeBatch(firebaseDb);
            operationCount = 0;
          }
        }

        // Commit any remaining operations
        if (operationCount > 0) {
          await batch.commit();
        }

        results.deletedCounts[collectionName] = totalDeleted;
        console.log(`Deleted ${totalDeleted} documents from ${collectionName}`);
      } catch (error) {
        console.error(`Error deleting ${collectionName}:`, error);
        results.errors.push(`Failed to delete ${collectionName}: ${error}`);
      }
    }

    // Reset any card statuses if needed
    try {
      const cardsRef = collection(firebaseDb, "pregenerated-cards");
      const reservedCardsQuery = await getDocs(cardsRef);
      
      const batch = writeBatch(firebaseDb);
      let resetCount = 0;
      
      reservedCardsQuery.forEach((doc) => {
        const data = doc.data();
        if (data.status === "reserved") {
          batch.update(doc.ref, {
            status: "available",
            reservedFor: null,
            reservedAt: null
          });
          resetCount++;
        }
      });
      
      if (resetCount > 0) {
        await batch.commit();
        results.deletedCounts["reset-reserved-cards"] = resetCount;
      }
    } catch (error) {
      console.error("Error resetting card statuses:", error);
      results.errors.push(`Failed to reset card statuses: ${error}`);
    }

    return NextResponse.json({
      success: true,
      message: "All transaction data has been reset",
      results
    });
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json(
      { error: "Failed to reset data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "This endpoint deletes all transactions and orders.",
    warning: "This action cannot be undone!",
    usage: "POST to this endpoint with { confirmReset: 'DELETE_ALL_TRANSACTIONS' }"
  });
}