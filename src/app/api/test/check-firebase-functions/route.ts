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

    // Get the most recent cards
    const cardsCol = collection(firebaseDb, "cards");
    const q = query(
      cardsCol, 
      where("owner", "==", userId), 
      orderBy("createdAt", "desc"), 
      limit(5)
    );
    
    const snapshot = await getDocs(q);
    const recentCards = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        owner: data.owner,
        chosenPhysicalCard: data.chosenPhysicalCard,
        activated: data.activated,
        transferCode: data.transferCode,
        // Check creation time
        createdSecondsAgo: data.createdAt ? 
          Math.floor((Date.now() - (data.createdAt.toDate?.()?.getTime() || 0)) / 1000) : null
      };
    });

    // Check for Firebase Functions
    const functionsIndicators = {
      hasRecentCards: recentCards.some(c => c.createdSecondsAgo && c.createdSecondsAgo < 300), // Created in last 5 min
      suspiciousPattern: recentCards.filter(c => 
        c.chosenPhysicalCard && !c.activated && c.owner
      ).length > 0
    };

    return NextResponse.json({
      recentCards,
      functionsIndicators,
      analysis: {
        probablyFromFunction: functionsIndicators.hasRecentCards && functionsIndicators.suspiciousPattern,
        message: "If cards appear here immediately after Xendit redirect, they're created by Firebase Function or external integration"
      }
    });
  } catch (error) {
    console.error("Error checking Firebase functions:", error);
    return NextResponse.json({ error: "Failed to check" }, { status: 500 });
  }
}