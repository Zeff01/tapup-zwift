"use client";

import { useQuery } from "@tanstack/react-query";
import { getPregeneratedCards } from "@/lib/firebase/actions/card-bank.action";
import { carouselCards } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MinimalCardBankPage() {
  const { data: pregeneratedCards = [], isLoading, error } = useQuery({
    queryKey: ["pregeneratedCards"],
    queryFn: getPregeneratedCards,
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {(error as Error).message}</div>;

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
      <h1 className="text-2xl font-bold mb-4">Minimal Card Bank</h1>
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