import React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChosenPhysicalCardType } from "@/components/forms/CardsAndUsersCreateFields";
import { EyeIcon } from "lucide-react";

interface PhysicalCard {
  id: ChosenPhysicalCardType;
  name: string;
  imageUrl: string;
  route: string;
}

const physicalCards: PhysicalCard[] = [
  {
    id: "card1",
    name: "Classic White",
    imageUrl: "/assets/card1-front.png",
    route: "/create/card/1",
  },
  {
    id: "card2",
    name: "Classic Black",
    imageUrl: "/assets/card2-front.png",
    route: "/create/card/2",
  },
  {
    id: "card3",
    name: "Modern Viper",
    imageUrl: "/assets/card3-front.png",
    route: "/create/card/3",
  },
  {
    id: "card4",
    name: "Minimalist",
    imageUrl: "/assets/card4-front.png",
    route: "/create/card/4",
  },
];

interface PhysicalCardCarouselProps {
  selectedCardId: ChosenPhysicalCardType;
  setSelectedCardId: (id: ChosenPhysicalCardType) => void;
}

export function PhysicalCardCarousel({
  selectedCardId,
  setSelectedCardId,
}: PhysicalCardCarouselProps) {
  return (
    <div className="border border-emerald-500">
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-screen-lg mx-auto overflow-hidden"
      >
        <CarouselContent className="flex justify-start items-center px-4 md:justify-center">
          {physicalCards.map((card) => (
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
                      src={card.imageUrl}
                      alt={card.name}
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

      {/* no carousel */}
    </div>
  );
}

{
  /* <div className="flex gap-10 justify-center items-center border border-blue-500 h-24">
  {physicalCards.map((card) => (
    <div
      key={card.id}
      className={`block transform hover:scale-105 transition-transform duration-300 ${
        selectedCardId === card.id ? "border-2 rounded-lg border-green-500" : ""
      }`}
      onClick={() => setSelectedCardId(card.id)}
    >
      <Card className="bg-black rounded-lg overflow-hidden border-red-500 size-24">
        <CardContent className="flex flex-col items-center justify-center p-1 size-24  ">
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={40}
            height={10}
            className="rounded-md size-24  object-cover border border-rose-500"
            layout="responsive"
            onClick={() => setSelectedCardId(card.id)}
          />
        </CardContent>
      </Card>
    </div>
  ))}
</div>; */
}
