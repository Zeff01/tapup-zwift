import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function GET(req: NextRequest) {
  try {
    // Get all transactions with "to-ship" or "pending" status
    const transactionsRef = collection(firebaseDb, "transactions");
    const q = query(
      transactionsRef,
      where("status", "in", ["to-ship", "pending"])
    );
    
    const transactionSnap = await getDocs(q);
    const transactions = transactionSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Get all reserved cards from pregenerated-cards
    const pregeneratedRef = collection(firebaseDb, "pregenerated-cards");
    const reservedQuery = query(
      pregeneratedRef,
      where("status", "==", "reserved")
    );
    
    const reservedSnap = await getDocs(reservedQuery);
    const reservedCards = reservedSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Analyze discrepancies
    const analysis = {
      totalPendingOrders: transactions.length,
      totalItemsInOrders: 0,
      totalReservedCards: reservedCards.length,
      orderDetails: [] as any[],
      reservedCardDetails: reservedCards.map(card => ({
        id: card.id,
        cardType: card.cardType,
        reservedFor: card.reservedFor,
        transferCode: card.transferCode,
        reservedAt: new Date(card.reservedAt).toISOString()
      })),
      missingReservations: [] as any[]
    };
    
    // Check each transaction
    for (const transaction of transactions) {
      const orderInfo = {
        orderId: transaction.id,
        userId: transaction.userId,
        status: transaction.status,
        createdAt: transaction.createdAt?.toDate?.()?.toISOString() || transaction.createdAt,
        items: [] as any[]
      };
      
      if (transaction.items && Array.isArray(transaction.items)) {
        analysis.totalItemsInOrders += transaction.items.length;
        
        for (const item of transaction.items) {
          const itemInfo = {
            name: item.name,
            quantity: item.quantity || 1,
            hasReservedCardId: !!item.reservedCardId,
            reservedCardId: item.reservedCardId,
            transferCode: item.transferCode,
            isReserved: false
          };
          
          // Check if this card is actually reserved
          if (item.reservedCardId) {
            const reserved = reservedCards.find(rc => rc.id === item.reservedCardId);
            if (reserved) {
              itemInfo.isReserved = true;
            } else {
              analysis.missingReservations.push({
                orderId: transaction.id,
                itemName: item.name,
                supposedReservedId: item.reservedCardId,
                transferCode: item.transferCode
              });
            }
          } else {
            // No reserved card ID at all
            analysis.missingReservations.push({
              orderId: transaction.id,
              itemName: item.name,
              reason: "No reservedCardId in transaction"
            });
          }
          
          orderInfo.items.push(itemInfo);
        }
      }
      
      analysis.orderDetails.push(orderInfo);
    }
    
    // Summary
    analysis.discrepancy = analysis.totalItemsInOrders - analysis.totalReservedCards;
    analysis.summary = {
      expectedReservations: analysis.totalItemsInOrders,
      actualReservations: analysis.totalReservedCards,
      missingReservations: analysis.discrepancy,
      problematicOrders: analysis.missingReservations.length
    };
    
    return NextResponse.json(analysis, { status: 200 });
  } catch (error) {
    console.error("Error checking order reservations:", error);
    return NextResponse.json(
      { error: "Failed to check order reservations" },
      { status: 500 }
    );
  }
}