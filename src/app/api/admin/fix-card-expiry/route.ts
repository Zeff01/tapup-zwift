import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, updateDoc, doc, query, where } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { add } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const { cardId } = await req.json();
    
    if (!cardId) {
      return NextResponse.json(
        { error: "Card ID is required" },
        { status: 400 }
      );
    }
    
    // Find subscriptions for this card
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    const q = query(subscriptionsRef, where("card_id", "==", cardId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Try with cardId field
      const q2 = query(subscriptionsRef, where("cardId", "==", cardId));
      const snapshot2 = await getDocs(q2);
      
      if (snapshot2.empty) {
        return NextResponse.json({
          error: "No subscription found for this card",
          cardId
        }, { status: 404 });
      }
    }
    
    // Get the latest subscription
    const subscriptions = snapshot.docs.length > 0 ? snapshot.docs : (await getDocs(query(subscriptionsRef, where("cardId", "==", cardId)))).docs;
    const latestSubscription = subscriptions[0].data();
    
    // Calculate expiry date
    const startDate = latestSubscription.dateStarted?.toDate ? latestSubscription.dateStarted.toDate() : new Date();
    const subscriptionDays = latestSubscription.subscriptionDays || 730; // Default 2 years
    const expiryDate = add(startDate, { days: subscriptionDays });
    
    // Update the card with expiry date
    const cardRef = doc(firebaseDb, "cards", cardId);
    await updateDoc(cardRef, {
      expiryDate: expiryDate,
      subscriptionId: subscriptions[0].id,
      status: "active",
    });
    
    // Update the subscription with expiry date if missing
    if (!latestSubscription.expiryDate) {
      await updateDoc(doc(firebaseDb, "subscriptions", subscriptions[0].id), {
        expiryDate: expiryDate,
      });
    }
    
    return NextResponse.json({
      success: true,
      message: `Fixed expiry date for card ${cardId}`,
      expiryDate: expiryDate.toISOString(),
      subscriptionDays,
      subscriptionId: subscriptions[0].id
    });
    
  } catch (error) {
    console.error("Error fixing card expiry:", error);
    return NextResponse.json(
      { error: "Failed to fix card expiry", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}