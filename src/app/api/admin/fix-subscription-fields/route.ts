import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, updateDoc, doc } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function POST(req: NextRequest) {
  try {
    // Get all subscriptions
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    const snapshot = await getDocs(subscriptionsRef);
    
    let fixed = 0;
    const updates = [];

    for (const subscriptionDoc of snapshot.docs) {
      const data = subscriptionDoc.data();
      const needsUpdate: any = {};
      
      // Check if card_id field is missing but cardId exists
      if (data.cardId && !data.card_id) {
        needsUpdate.card_id = data.cardId;
      }
      
      // Check if user_id field is missing but userId exists
      if (data.userId && !data.user_id) {
        needsUpdate.user_id = data.userId;
      }
      
      // Check if dateStarted is missing but createdAt exists
      if (!data.dateStarted && data.createdAt) {
        needsUpdate.dateStarted = data.createdAt;
      }
      
      // Check if dateAvailed is missing
      if (!data.dateAvailed && data.createdAt) {
        needsUpdate.dateAvailed = data.createdAt;
      }
      
      // If any updates needed
      if (Object.keys(needsUpdate).length > 0) {
        updates.push({
          id: subscriptionDoc.id,
          updates: needsUpdate
        });
        
        await updateDoc(doc(firebaseDb, "subscriptions", subscriptionDoc.id), needsUpdate);
        fixed++;
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Fixed ${fixed} subscriptions`,
      totalSubscriptions: snapshot.size,
      details: updates
    });
    
  } catch (error) {
    console.error("Error fixing subscription fields:", error);
    return NextResponse.json(
      { error: "Failed to fix subscription fields", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}