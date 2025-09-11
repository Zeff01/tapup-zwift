"use client";

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/providers/user-provider";

export default function DebugCardsPage() {
  const { user } = useUserContext();
  const [recentCards, setRecentCards] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!user?.uid) return;
    
    // Listen to cards collection
    const cardsQuery = query(
      collection(firebaseDb, "cards"),
      orderBy("timestamp", "desc")
    );
    
    const unsubscribeCards = onSnapshot(cardsQuery, (snapshot) => {
      const cards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().timestamp?.toDate?.() || doc.data().createdAt?.toDate?.() || new Date()
      }));
      
      // Filter to show only recent cards (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const recent = cards.filter(card => {
        const cardDate = new Date(card.createdAt);
        return cardDate > oneDayAgo;
      });
      
      setRecentCards(recent);
      
      // Log any new cards
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("[REALTIME DEBUG] New card added:", change.doc.id, change.doc.data());
        }
      });
    });
    
    // Listen to transactions collection
    const transQuery = query(
      collection(firebaseDb, "transactions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribeTrans = onSnapshot(transQuery, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
      
      setRecentTransactions(transactions);
    }, (error) => {
      console.log("Transaction query error (index might be needed):", error);
      // Fallback without ordering
      const fallbackQuery = query(
        collection(firebaseDb, "transactions"),
        where("userId", "==", user.uid)
      );
      
      onSnapshot(fallbackQuery, (snapshot) => {
        const transactions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        
        // Sort in memory
        transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setRecentTransactions(transactions);
      });
    });
    
    setListening(true);
    
    // Cleanup
    return () => {
      unsubscribeCards();
      unsubscribeTrans();
    };
  };

  useEffect(() => {
    if (user?.role === "admin") {
      startListening();
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <div>Admin access only</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Cards - Real-time Monitor</h1>
      
      <div className="mb-6">
        <Button onClick={startListening} disabled={listening}>
          {listening ? "Listening..." : "Start Real-time Monitoring"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Cards (Last 24h)</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentCards.map((card) => (
              <div key={card.id} className="border p-3 rounded">
                <p className="font-mono text-xs">{card.id}</p>
                <p className="text-sm">Owner: {card.owner || "None"}</p>
                <p className="text-sm">Status: {card.status || "N/A"}</p>
                <p className="text-sm">Physical Card: {card.chosenPhysicalCard?.id || "None"}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(card.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {recentCards.length === 0 && <p className="text-gray-500">No recent cards</p>}
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentTransactions.map((trans) => (
              <div key={trans.id} className="border p-3 rounded">
                <p className="font-mono text-xs">{trans.id}</p>
                <p className="text-sm">Status: {trans.status}</p>
                <p className="text-sm">Items: {trans.items?.length || 0}</p>
                <div className="text-xs">
                  {trans.items?.map((item: any, i: number) => (
                    <p key={i}>- {item.name} (Code: {item.transferCode || "N/A"})</p>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Created: {new Date(trans.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {recentTransactions.length === 0 && <p className="text-gray-500">No transactions</p>}
          </div>
        </Card>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debugging Info</h3>
        <p className="text-sm">This page monitors the cards and transactions collections in real-time.</p>
        <p className="text-sm">Any new cards created will appear immediately above.</p>
        <p className="text-sm">Check the browser console for detailed logs when cards are added.</p>
      </div>
    </div>
  );
}