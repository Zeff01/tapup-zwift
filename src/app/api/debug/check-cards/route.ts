import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, orderBy, limit } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    // Get all cards for this user
    const cardsCol = collection(firebaseDb, "cards");
    const q = query(cardsCol, where("owner", "==", userId), orderBy("createdAt", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    const cards = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        owner: data.owner,
        chosenPhysicalCard: data.chosenPhysicalCard,
        activated: data.activated,
        status: data.status,
        transferCode: data.transferCode,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        templateId: data.templateId,
        subscription_id: data.subscription_id,
        onboarding: data.onboarding,
        // Check if this looks like a problematic card
        isProblem: data.chosenPhysicalCard && !data.activated && data.owner ? true : false
      };
    });

    // Separate physical and virtual cards
    const physicalCards = cards.filter(c => c.chosenPhysicalCard);
    const virtualCards = cards.filter(c => !c.chosenPhysicalCard);
    const problematicCards = cards.filter(c => c.isProblem);

    return NextResponse.json({
      totalCards: cards.length,
      physicalCards: physicalCards.length,
      virtualCards: virtualCards.length,
      problematicCards: problematicCards.length,
      cards: cards,
      analysis: {
        hasProblematicCards: problematicCards.length > 0,
        problematicCardIds: problematicCards.map(c => c.id)
      }
    });
  } catch (error) {
    console.error("Error checking cards:", error);
    return NextResponse.json({ error: "Failed to check cards" }, { status: 500 });
  }
}