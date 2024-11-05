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


const CarouselService: React.FC<{servicePhotos: string[],serviceDescription: string}>= ({servicePhotos,serviceDescription}) => {
  const [currentCard, setCurrentCard] = useState<CarouselCard>({
    title: "",
    image: servicePhotos[0],
    description: serviceDescription
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
    <section className="flex flex-col items-center justify-center pt-5 shadow-xl pb-8 mx-auto ">
      <h2 className="w-full text-left font-semibold pb-4 pl-8 text-2xl">
        Services
      </h2>
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-xs flex justify-center items-center">
          <CarouselContent>
        
            {servicePhotos.length > 0 ? (
            <CarouselItem className="flex justify-center ">
                <div
                  className="cursor-pointer relative h-[12rem] overflow-hidden aspect-video pl-0"
                >
                
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
                <div className="cursor-pointer relative w-[13rem] aspect-square pl-0">
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
       
          <CarouselPrevious onClick={handlePrevious}
             className="left-2 md:left-1 border-black"
            disabled={currentSlideIndex === 0} />
          <CarouselNext onClick={handleNext}
            className="right-2 md:right-1 border-black"
            disabled={currentSlideIndex === servicePhotos.length -1 } />
        </Carousel>
      </div>
      <div className="w-full">
        <ServiceDetails service={currentCard} />
      </div>
    </section>
  );
};

export default CarouselService;