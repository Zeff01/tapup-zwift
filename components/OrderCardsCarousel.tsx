import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
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
    <div className="relative w-full py-2">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full relative"
      >
        <CarouselPrevious className="-left-6 z-10 hidden lg:block size-12" />
        <CarouselContent className="py-2">
          {Object.keys(carouselCards).map((key) => {
            const card = carouselCards[key as keyof typeof carouselCards];
            return (
              <CarouselItem
                key={key}
                className="flex-none rounded-xl md:mx-1 md:mt-7"
              >
                <div
                  className={`block transform   transition-transform duration-300 cursor-pointer ${
                    selectedCardId === key
                      ? "scale-110 ring-1 ring-green-800 rounded-lg "
                      : ""
                  }`}
                  onClick={() => setSelectedCardId(key)}
                >
                  <Card className="rounded-lg   aspect-[16/10] w-28 md:w-48 lg:w-72">
                    <CardContent className="relative flex flex-col items-center justify-center p-1 text-white">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={120}
                        height={48}
                        className="rounded-md object-cover"
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
        <CarouselNext className="-right-6 z-10 hidden lg:block size-12" />
      </Carousel>
    </div>
  );
}
