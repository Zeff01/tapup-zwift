import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cardItems } from "@/constants";
import { CardItem } from "@/types/types";

interface OrderCardsCarouselProps {
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
}

export function OrderCardsCarousel({
  selectedCardId,
  setSelectedCardId,
}: OrderCardsCarouselProps) {
  return (
    <div className="">
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-screen-lg mx-auto overflow-hidden"
      >
        <CarouselContent className="flex justify-start items-center px-4 md:justify-center">
          {cardItems.map((card: CardItem) => (
            <CarouselItem key={card.id} className="flex-none p-2">
              <div
                className={`block transform hover:scale-105 transition-transform duration-300 cursor-pointer ${
                  selectedCardId === card.id
                    ? "border-2 rounded-lg border-green-500"
                    : ""
                }`}
                onClick={() => setSelectedCardId(card.id)}
              >
                <Card className="bg-black rounded-lg overflow-hidden border-none aspect-[16/10] w-24 md:w-28">
                  <CardContent className="flex flex-col items-center justify-center p-1 text-white">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={100}
                      height={150}
                      className="rounded-md w-full object-cover"
                      layout="responsive"
                      onClick={() => setSelectedCardId(card.id)}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
