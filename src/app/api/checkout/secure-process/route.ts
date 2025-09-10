import { NextRequest, NextResponse } from "next/server";
import { reservePregeneratedCard } from "@/lib/firebase/actions/card-bank.action";
import { collection, addDoc } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authCurrentUserv2 } from "@/lib/firebase/auth";

// Secure checkout process that ONLY reserves cards, never creates them
export async function POST(req: NextRequest) {
  console.log("\n[SECURE CHECKOUT] Starting secure checkout process");
  
  try {
    // Verify user is authenticated
    const user = await authCurrentUserv2();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { cardItems, totalAmount, shippingInfo } = await req.json();
    
    console.log("[SECURE CHECKOUT] Processing order for user:", user.uid);
    console.log("[SECURE CHECKOUT] Card items:", cardItems);
    
    // Reserve pregenerated cards ONLY - no card creation
    const reservedCards = [];
    for (const item of cardItems) {
      console.log("[SECURE CHECKOUT] Reserving card type:", item.id);
      const reserved = await reservePregeneratedCard(item.id, user.uid);
      if (!reserved) {
        throw new Error(`Failed to reserve ${item.id} card`);
      }
      reservedCards.push(reserved);
    }
    
    console.log("[SECURE CHECKOUT] Successfully reserved", reservedCards.length, "cards");
    
    // Create transaction record
    const transactionData = {
      userId: user.uid,
      orderId: `secure-order-${Date.now()}`,
      status: "pending-payment",
      items: cardItems.map((item: any, index: number) => ({
        ...item,
        reservedCardId: reservedCards[index]?.id,
        transferCode: reservedCards[index]?.transferCode,
      })),
      shippingInfo,
      totalAmount,
      createdAt: new Date(),
      secureCheckout: true, // Mark as secure checkout
    };
    
    const transactionRef = await addDoc(
      collection(firebaseDb, "transactions"),
      transactionData
    );
    
    console.log("[SECURE CHECKOUT] Transaction created:", transactionRef.id);
    console.log("[SECURE CHECKOUT] NO CARDS CREATED - Only reserved pregenerated cards");
    
    return NextResponse.json({
      success: true,
      transactionId: transactionRef.id,
      reservedCards: reservedCards.map(c => ({
        id: c.id,
        transferCode: c.transferCode,
      })),
      message: "Order processed securely. Cards reserved but not created.",
    });
    
  } catch (error) {
    console.error("[SECURE CHECKOUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to process order securely" },
      { status: 500 }
    );
  }
}