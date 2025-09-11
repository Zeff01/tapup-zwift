import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where, orderBy, limit } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function GET(req: NextRequest) {
  try {
    // Investigate the phantom cards more deeply
    const phantomCardIds = [
      "VgMrKn5CpATX9RlVhO7u",
      "cxZVIiWJLydBJ4ISBDfT"
    ];
    
    const results: any = {
      phantomCards: [],
      subscriptions: [],
      transactions: [],
      pregeneratedCards: [],
      recentCardCreations: [],
    };
    
    // 1. Get full details of phantom cards
    const cardsRef = collection(firebaseDb, "cards");
    for (const cardId of phantomCardIds) {
      const cardQuery = query(cardsRef, where("__name__", "==", cardId));
      const cardSnap = await getDocs(cardQuery);
      cardSnap.forEach(doc => {
        const data = doc.data();
        results.phantomCards.push({
          id: doc.id,
          ...data,
          _allFields: Object.keys(data),
          _hasOwner: !!data.owner,
          _hasSubscriptionId: !!data.subscription_id,
          _isActivated: !!data.activated,
          _createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        });
      });
    }
    
    // 2. Find subscriptions for these cards
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    for (const cardId of phantomCardIds) {
      const subQuery = query(subscriptionsRef, where("card_id", "==", cardId));
      const subSnap = await getDocs(subQuery);
      subSnap.forEach(doc => {
        const data = doc.data();
        results.subscriptions.push({
          id: doc.id,
          card_id: data.card_id,
          user_id: data.user_id,
          dateAvailed: data.dateAvailed?.toDate?.()?.toISOString() || data.dateAvailed,
          dateStarted: data.dateStarted?.toDate?.()?.toISOString() || data.dateStarted,
          subscriptionDays: data.subscriptionDays,
        });
      });
    }
    
    // 3. Search for transactions that might reference these cards
    const transactionsRef = collection(firebaseDb, "transactions");
    const transSnap = await getDocs(transactionsRef);
    transSnap.forEach(doc => {
      const data = doc.data();
      if (data.items && Array.isArray(data.items)) {
        const hasPhantomCard = data.items.some((item: any) => 
          phantomCardIds.includes(item.id) || 
          phantomCardIds.includes(item.reservedCardId) ||
          (item.name && (item.name.toLowerCase() === "vortex" || item.name.toLowerCase() === "aurora"))
        );
        
        if (hasPhantomCard) {
          results.transactions.push({
            id: doc.id,
            userId: data.userId,
            orderId: data.orderId,
            status: data.status,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
            items: data.items,
            secureCheckout: data.secureCheckout,
          });
        }
      }
    });
    
    // 4. Check pregenerated-cards collection
    const pregeneratedRef = collection(firebaseDb, "pregenerated-cards");
    for (const cardId of phantomCardIds) {
      const pregenQuery = query(pregeneratedRef, where("__name__", "==", cardId));
      const pregenSnap = await getDocs(pregenQuery);
      pregenSnap.forEach(doc => {
        results.pregeneratedCards.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    
    // 5. Get recently created cards (last 10)
    const recentCardsQuery = query(
      cardsRef, 
      orderBy("createdAt", "desc"), 
      limit(10)
    );
    const recentSnap = await getDocs(recentCardsQuery);
    recentSnap.forEach(doc => {
      const data = doc.data();
      if (data.chosenPhysicalCard && !data.activated) {
        results.recentCardCreations.push({
          id: doc.id,
          owner: data.owner,
          chosenPhysicalCard: data.chosenPhysicalCard,
          activated: data.activated,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          transferCode: data.transferCode,
        });
      }
    });
    
    // 6. Analysis
    results.analysis = {
      problemSummary: "Physical cards created with owners but not activated",
      likelyFlow: [
        "1. User purchases physical cards",
        "2. System creates subscriptions",
        "3. addSubscription tries to update non-existent cards",
        "4. Somehow cards get created with partial data"
      ],
      potentialCauses: [
        "batch.update() might create documents in some cases",
        "Another process might be creating cards",
        "Cards might have been created earlier in the flow"
      ]
    };
    
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error investigating phantom cards:", error);
    return NextResponse.json(
      { error: "Failed to investigate phantom cards" },
      { status: 500 }
    );
  }
}