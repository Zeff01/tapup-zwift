import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function GET(req: NextRequest) {
  try {
    // The phantom card IDs we're investigating
    const suspectCardIds = [
      "VgMrKn5CpATX9RlVhO7u",
      "cxZVIiWJLydBJ4ISBDfT"
    ];
    
    const results = [];
    
    for (const cardId of suspectCardIds) {
      const cardRef = doc(firebaseDb, "cards", cardId);
      const cardDoc = await getDoc(cardRef);
      
      if (cardDoc.exists()) {
        const data = cardDoc.data();
        
        // Extract all timestamp fields
        const timestamps: any = {};
        if (data.createdAt?.toDate) {
          timestamps.createdAt = data.createdAt.toDate().toISOString();
        }
        if (data.timestamp?.toDate) {
          timestamps.timestamp = data.timestamp.toDate().toISOString();
        }
        if (data.activatedAt?.toDate) {
          timestamps.activatedAt = data.activatedAt.toDate().toISOString();
        }
        
        results.push({
          id: cardId,
          owner: data.owner,
          status: data.status,
          activated: data.activated,
          chosenPhysicalCard: data.chosenPhysicalCard,
          transferCode: data.transferCode,
          subscription_id: data.subscription_id,
          timestamps,
          allFields: Object.keys(data),
        });
      } else {
        results.push({
          id: cardId,
          exists: false
        });
      }
    }
    
    // Also check if these exist in pregenerated-cards
    const pregeneratedResults = [];
    for (const cardId of suspectCardIds) {
      const pregeneratedRef = doc(firebaseDb, "pregenerated-cards", cardId);
      const pregeneratedDoc = await getDoc(pregeneratedRef);
      
      if (pregeneratedDoc.exists()) {
        const data = pregeneratedDoc.data();
        pregeneratedResults.push({
          id: cardId,
          inPregeneratedCollection: true,
          status: data.status,
          cardType: data.cardType,
          reservedFor: data.reservedFor,
          assignedTo: data.assignedTo,
        });
      }
    }
    
    return NextResponse.json({
      message: "Phantom card investigation",
      cardsCollection: results,
      pregeneratedCollection: pregeneratedResults,
      currentTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error investigating cards:", error);
    return NextResponse.json(
      { error: "Failed to investigate cards" },
      { status: 500 }
    );
  }
}