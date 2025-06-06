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
import { carouselCards } from "@/constants";

interface OrderCardsCarouselProps {
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
}

export function OrderCardsCarousel({
  selectedCardId,
  setSelectedCardId,
}: OrderCardsCarouselProps) {
  return (
    <div className="px-12">
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-screen-lg mx-auto "
      >
        <CarouselPrevious />
        <CarouselContent className="flex justify-start items-center px-4 md:justify-center">
          {Object.keys(carouselCards).map((key) => {
            const card = carouselCards[key as keyof typeof carouselCards];
            return (
              <CarouselItem key={card.id} className="flex-none p-2">
                <div
                  className={`block transform hover:scale-105 transition-transform duration-300 cursor-pointer ${
                    selectedCardId === card.id
                      ? "border-2 rounded-lg border-green-500"
                      : ""
                  }`}
                  onClick={() => setSelectedCardId(key)}
                >
                  <Card className="bg-black rounded-lg border-none aspect-[16/10] w-24 md:w-28">
                    <CardContent className="flex flex-col items-center justify-center p-1 text-white">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={100}
                        height={150}
                        className="rounded-md w-full object-cover"
                        layout="responsive"
                        onClick={() => setSelectedCardId(key)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselNext />
      </Carousel>
    </div>
  );
}
