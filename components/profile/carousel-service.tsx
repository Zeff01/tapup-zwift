"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import ServiceDetails from "./service-details";

interface CarouselCard {
  title: string;
  image: string;
  description: string;
}

const CarouselService: React.FC<{
  servicePhotos: string[];
  serviceDescription: string;
}> = ({ servicePhotos, serviceDescription }) => {
  const [currentCard, setCurrentCard] = useState<CarouselCard>({
    title: "",
    image: servicePhotos[0],
    description: serviceDescription,
  });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < servicePhotos.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pt-5 shadow-xl pb-8 mx-auto text-black">
      <h2 className="w-full text-left font-semibold pb-4 pl-8 text-2xl">
        Services
      </h2>
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-xs flex justify-center items-center">
          <CarouselContent>
            {servicePhotos.length > 0 ? (
              <CarouselItem className="flex justify-center ">
                <div className="cursor-pointer relative w-[11rem] aspect-square md:w-[15rem]">
                  <Image
                    src={servicePhotos[currentSlideIndex]}
                    alt={`Service ${currentSlideIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ) : (
              <CarouselItem className="flex justify-center">
                <div className="cursor-pointer relative w-[11rem] aspect-square md:w-[15rem]">
                  <Image
                    src="/assets/profile-service-image.png"
                    alt="Default Service"
                    fill
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>

          <CarouselPrevious
         type="button"
            onClick={handlePrevious}
            className="left-[-40px] border-black text-primary bg-secondary"
            disabled={currentSlideIndex === 0}
          />
          <CarouselNext
   type="button"
            onClick={handleNext}
            className="right-[-40px] border-black text-primary bg-secondary"
            disabled={currentSlideIndex === servicePhotos.length - 1}
          />
        </Carousel>
      </div>
      <div className="w-full">
        <ServiceDetails service={currentCard} />
      </div>
    </section>
  );
};

export default CarouselService;
