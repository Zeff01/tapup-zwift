import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { confirmReservation } from "@/lib/firebase/actions/card-reservation.action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, transactionId, newStatus } = body;

    if (!planId && !transactionId) {
      return NextResponse.json(
        { error: "Either planId or transactionId is required" },
        { status: 400 }
      );
    }

    let docRef;
    
    if (transactionId) {
      // Direct transaction ID provided
      docRef = doc(firebaseDb, "transactions", transactionId);
    } else {
      // Find transaction by xenditPlanId
      const transactionsRef = collection(firebaseDb, "transactions");
      const q = query(transactionsRef, where("xenditPlanId", "==", planId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.error("No transaction found for plan ID:", planId);
        return NextResponse.json(
          { error: "Transaction not found" },
          { status: 404 }
        );
      }
      
      // Get the first matching transaction
      const transactionDoc = querySnapshot.docs[0];
      docRef = doc(firebaseDb, "transactions", transactionDoc.id);
    }

    // Get the transaction data to find user_id
    const transactionDoc = await getDoc(docRef);
    const transactionData = transactionDoc.data();
    
    if (!transactionData) {
      return NextResponse.json(
        { error: "Transaction data not found" },
        { status: 404 }
      );
    }
    
    // Update the transaction status
    await updateDoc(docRef, {
      status: newStatus || "completed",
      updatedAt: new Date().toISOString(),
      paymentCompletedAt: new Date().toISOString()
    });

    // If marking as completed, confirm the card reservations
    if (newStatus === "completed" || !newStatus) {
      const userId = transactionData.user_id || transactionData.userId;
      if (userId) {
        try {
          await confirmReservation(userId, transactionDoc.id);
          console.log("Card reservations confirmed successfully");
        } catch (error) {
          console.error("Error confirming card reservations:", error);
          // Don't fail the whole request if reservation confirmation fails
        }
      }
    }

    console.log("Transaction status updated successfully");
    
    return NextResponse.json({ 
      success: true,
      message: "Transaction status updated and cards confirmed"
    });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}