"use client";

import { useEffect, useState } from "react";
import { getPregeneratedCards } from "@/lib/firebase/actions/card-bank.action";
import { carouselCards } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DirectCardBankPage() {
  const [pregeneratedCards, setPregeneratedCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const cards = await getPregeneratedCards();
        setPregeneratedCards(cards);
      } catch (err: any) {
        setError(err.message || "Failed to fetch cards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  // Calculate stock for each card variant
  const cardVariantStock = Object.values(carouselCards).map((card) => {
    const variantCards = pregeneratedCards.filter((pc) => pc.cardType === card.id);
    return {
      id: card.id,
      title: card.title,
      totalCards: variantCards.length,
      availableCards: variantCards.filter((pc) => pc.status === "available").length,
    };
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Direct Card Bank (No React Query)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardVariantStock.map((variant) => (
          <Card key={variant.id}>
            <CardHeader>
              <CardTitle>{variant.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total: {variant.totalCards}</p>
              <p>Available: {variant.availableCards}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}