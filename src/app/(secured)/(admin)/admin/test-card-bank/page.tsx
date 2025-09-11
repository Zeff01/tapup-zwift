"use client";

import { useEffect, useState } from "react";
import { getPregeneratedCards } from "@/lib/firebase/actions/card-bank.action";
import { Button } from "@/components/ui/button";

export default function TestCardBankPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPregeneratedCards();
      setCards(result);
      console.log("Fetched cards:", result);
    } catch (err: any) {
      console.error("Error fetching cards:", err);
      setError(err.message || "Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Card Bank</h1>
      
      <Button onClick={fetchCards} disabled={loading}>
        {loading ? "Loading..." : "Fetch Cards"}
      </Button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Cards: {cards.length}</h2>
        {cards.length > 0 && (
          <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(cards[0], null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}