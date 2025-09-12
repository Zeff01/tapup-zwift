import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transactionId, userId } = body;

    if (!transactionId && !userId) {
      return NextResponse.json(
        { error: "Either transactionId or userId is required" },
        { status: 400 }
      );
    }

    let transaction;
    
    if (transactionId) {
      // Get specific transaction
      const docRef = doc(firebaseDb, "transactions", transactionId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        transaction = { id: docSnap.id, ...docSnap.data() };
      }
    } else {
      // Get latest transaction for user
      const transactionsRef = collection(firebaseDb, "transactions");
      const q = query(
        transactionsRef,
        where("user_id", "==", userId),
        where("status", "==", "pending")
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        transaction = { id: doc.id, ...doc.data() };
      }
    }

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Check reserved cards
    const pregeneratedCardsRef = collection(firebaseDb, "pregenerated-cards");
    const cardsQuery = query(
      pregeneratedCardsRef,
      where("reservedFor", "==", transaction.user_id || transaction.userId),
      where("status", "==", "reserved")
    );
    const cardsSnapshot = await getDocs(cardsQuery);
    
    const reservedCards = cardsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      transaction,
      reservedCards,
      debug: {
        hasPaymentUrl: !!transaction.paymentUrl,
        hasPlanId: !!transaction.xenditPlanId,
        transactionStatus: transaction.status,
        cardCount: reservedCards.length,
        userId: transaction.user_id || transaction.userId
      }
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}