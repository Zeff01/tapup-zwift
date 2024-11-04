"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import ServiceDetails from "./service-details";

const serviceImg = [
  {
    title: "Spa & Wellness",
    image: "/assets/profile-service-image.png",
    description:
      "Our Wellness Spa Team of Professionals are committed to openly listening to the needs of our guests and with respect, genuine acceptance, and compassion will help to positively guide towards physical relaxation, spiritual and mental renewal, and individual growth within a sanctuary that welcomes one home again and again.",
  },
  {
    title: "Spa & Wellness",
    image: "/assets/profile-service-image.png",
    description:
      "Our Wellness Spa Team of Professionals are committed to openly listening to the needs of our guests and with respect, genuine acceptance, and compassion will help to positively guide towards physical relaxation, spiritual and mental renewal, and individual growth within a sanctuary that welcomes one home again and again.",
  },
  {
    title: "Spa & Wellness",
    image: "/assets/profile-service-image.png",
    description:
      "Our Wellness Spa Team of Professionals are committed to openly listening to the needs of our guests and with respect, genuine acceptance, and compassion will help to positively guide towards physical relaxation, spiritual and mental renewal, and individual growth within a sanctuary that welcomes one home again and again.",
  },
  // Repeat the same structure for other items...
];

interface CarouselCard {
  title: string;
  image: string;
  description: string;
}

const CarouselService: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<CarouselCard>(serviceImg[0]);

  const handleClickCard = (service: CarouselCard) => {
    setCurrentCard(service);
  };

  return (
    <section className="flex flex-col w-full pt-5 shadow-xl pb-8 ">
      <h2 className="text-left font-semibold pl-5 md:pl-[5rem]  md:text-2xl text-xl">
        Services
      </h2>
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-xs flex justify-center items-center">
          <CarouselContent>
            {serviceImg.map((item, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <div
                  className="cursor-pointer relative w-[13rem] md:w-[20rem] aspect-square pl-0"
                  onClick={() => handleClickCard(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-[-5rem] border-black" />
          <CarouselNext className="right-4 md:right-[-5rem] border-black" />
        </Carousel>
      </div>
      <div className="w-full md:w-1/2 p-4 mx-auto bg-red">
        <ServiceDetails service={currentCard} />
      </div>
    </section>
  );
};

export default CarouselService;
