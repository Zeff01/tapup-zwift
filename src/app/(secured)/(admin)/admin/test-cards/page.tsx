"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { useUserContext } from "@/providers/user-provider";

export default function TestCardsPage() {
  const { user } = useUserContext();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    const testResults: any = {
      timestamp: new Date().toISOString(),
      userId: user.uid,
      userCards: [],
      pregeneratedCards: [],
      reservedForUser: [],
      issues: []
    };

    try {
      // 1. Get all cards owned by user
      const cardsQuery = query(
        collection(firebaseDb, "cards"),
        where("owner", "==", user.uid)
      );
      const cardsSnapshot = await getDocs(cardsQuery);
      
      testResults.userCards = cardsSnapshot.docs.map(doc => ({
        id: doc.id,
        owner: doc.data().owner,
        status: doc.data().status,
        activated: doc.data().activated,
        chosenPhysicalCard: doc.data().chosenPhysicalCard,
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().timestamp?.toDate?.()
      }));

      // 2. Check if any of these cards exist in pregenerated-cards
      for (const card of testResults.userCards) {
        try {
          const pregeneratedRef = doc(firebaseDb, "pregenerated-cards", card.id);
          const pregeneratedDoc = await getDoc(pregeneratedRef);
          
          if (pregeneratedDoc.exists()) {
            const data = pregeneratedDoc.data();
            testResults.pregeneratedCards.push({
              id: card.id,
              ...data,
              existsInBothCollections: true
            });
            
            testResults.issues.push({
              type: "DUPLICATE_CARD",
              message: `Card ${card.id} exists in both collections`,
              cardData: card,
              pregeneratedData: data
            });
          }
        } catch (e) {
          console.error("Error checking pregenerated card:", e);
        }
      }

      // 3. Check for reserved cards for this user
      const reservedQuery = query(
        collection(firebaseDb, "pregenerated-cards"),
        where("reservedFor", "==", user.uid)
      );
      const reservedSnapshot = await getDocs(reservedQuery);
      
      testResults.reservedForUser = reservedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 4. Check for anomalies
      testResults.userCards.forEach((card: any) => {
        if (card.owner && !card.activated) {
          testResults.issues.push({
            type: "NOT_ACTIVATED",
            message: `Card ${card.id} has owner but is not activated`,
            card: card
          });
        }
      });

      // Check if user has more cards than they should
      const activatedCount = testResults.userCards.filter(c => c.activated).length;
      const notActivatedCount = testResults.userCards.filter(c => !c.activated).length;
      
      if (notActivatedCount > 0) {
        testResults.issues.push({
          type: "UNACTIVATED_CARDS",
          message: `User has ${notActivatedCount} unactivated cards`,
          count: notActivatedCount
        });
      }

    } catch (error) {
      console.error("Test error:", error);
      testResults.error = error?.toString();
    }

    setResults(testResults);
    setLoading(false);
  };

  if (user?.role !== "admin") {
    return <div>Admin access only</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Card Debug Test</h1>
      
      <Button onClick={runTest} disabled={loading} className="mb-6">
        {loading ? "Running Test..." : "Run Card Test"}
      </Button>

      {results && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Test Results</h2>
            <div className="text-sm space-y-2">
              <p>Timestamp: {results.timestamp}</p>
              <p>User ID: {results.userId}</p>
              <p>Total User Cards: {results.userCards.length}</p>
              <p>Cards in Both Collections: {results.pregeneratedCards.length}</p>
              <p>Reserved Cards: {results.reservedForUser.length}</p>
              <p className="font-semibold text-red-500">Issues Found: {results.issues.length}</p>
            </div>
          </Card>

          {results.issues.length > 0 && (
            <Card className="p-6 border-red-500">
              <h2 className="text-lg font-semibold mb-4 text-red-500">Issues</h2>
              <div className="space-y-4">
                {results.issues.map((issue: any, i: number) => (
                  <div key={i} className="border p-3 rounded">
                    <p className="font-semibold">{issue.type}</p>
                    <p className="text-sm">{issue.message}</p>
                    {issue.card && (
                      <pre className="text-xs mt-2 overflow-auto">
                        {JSON.stringify(issue.card, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">User's Cards</h2>
            <div className="space-y-2">
              {results.userCards.map((card: any) => (
                <div key={card.id} className="border p-3 rounded text-sm">
                  <p className="font-mono">{card.id}</p>
                  <p>Status: {card.status || "none"} | Activated: {card.activated ? "Yes" : "No"}</p>
                  <p>Physical Card: {card.chosenPhysicalCard?.id || "none"}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Raw Results</h2>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}