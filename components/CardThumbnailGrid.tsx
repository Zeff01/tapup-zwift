import React from "react";
import { Card } from "@/components/ui/card";
import { carouselCards } from "@/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCards } from "@/lib/firebase/actions/card-bank.action";

interface CardThumbnailGridProps {
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
  allowOutOfStockSelection?: boolean;
}

export function CardThumbnailGrid({
  selectedCardId,
  setSelectedCardId,
  allowOutOfStockSelection = false,
}: CardThumbnailGridProps) {
  // Fetch stock for all cards
  const { data: stockData = {} } = useQuery({
    queryKey: ["all-cards-stock"],
    queryFn: async () => {
      console.log("[CardThumbnailGrid] Fetching stock for all card types...");
      const stockByType: Record<string, number> = {};
      
      // Fetch stock for each card type
      await Promise.all(
        Object.keys(carouselCards).map(async (cardType) => {
          console.log(`[CardThumbnailGrid] Fetching stock for ${cardType}...`);
          const availableCards = await getAvailableCards(cardType);
          console.log(`[CardThumbnailGrid] ${cardType}: ${availableCards.length} available`);
          stockByType[cardType] = availableCards.length;
        })
      );
      
      console.log("[CardThumbnailGrid] Final stock data:", stockByType);
      return stockByType;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 py-2">
      {Object.keys(carouselCards).map((key) => {
        const card = carouselCards[key as keyof typeof carouselCards];
        const stock = stockData[key] || 0;
        const isOutOfStock = stock === 0;
        
        return (
          <div
            key={key}
            className={`relative cursor-pointer transition-all duration-200 rounded-lg ${
              selectedCardId === key
                ? "ring-2 ring-green-500 shadow-lg shadow-green-500/30 scale-105"
                : isOutOfStock && !allowOutOfStockSelection
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-lg"
            }`}
            onClick={() => (allowOutOfStockSelection || !isOutOfStock) && setSelectedCardId(key)}
          >
            <Card className="relative overflow-hidden aspect-[1.586/1] bg-transparent border-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, (max-width: 1024px) 15vw, 10vw"
              />
              {/* Stock badge */}
              <div className="absolute top-1 right-1">
                <Badge
                  variant={isOutOfStock ? "destructive" : stock <= 5 ? "secondary" : "default"}
                  className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 font-bold ${
                    isOutOfStock
                      ? "bg-red-600"
                      : stock <= 5
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  } text-white border-0 shadow-md`}
                >
                  {isOutOfStock ? "0" : stock}
                </Badge>
              </div>
              {/* Card name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-1 pt-3">
                <p className="text-[10px] sm:text-xs text-center truncate font-medium">{card.title}</p>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}