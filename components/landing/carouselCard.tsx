"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import CardDetails from "./card-details";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { carouselCards } from "@/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "usehooks-ts";
import { type CarouselApi } from "@/components/ui/carousel";
// import { CarouselCardKey } from "@/types/types";
import { useSearchParams } from "next/navigation";

interface Params {
  viewCard?: boolean;
  onChange?: (title: string) => void;
}

const TapUpCarousel = ({ viewCard, onChange }: Params) => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [api, setApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const media = useMediaQuery("(max-width: 1024px)");

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const plugins = useMemo(
    () => (!viewCard ? [plugin.current] : []),
    [viewCard]
  );

  // Initial scroll based on title params
  useEffect(() => {
    if (!api || !title) return;

    const index = Object.values(carouselCards).findIndex(
      (card) => card.title === title
    );

    if (index >= 0) {
      api.scrollTo(index);
    }
  }, [api, title, media]);

  // Sync carouselIndex and notify onChange when carousel scroll changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();

      setCarouselIndex(index);

      const card = Object.values(carouselCards)[index];

      if (onChange && card) {
        onChange(card.title);
      }
    };

    onSelect(); // initial

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle manual select card
  const onCardClick = (title: string, index: number) => {
    if (!api) return;

    // already selected card
    if (carouselIndex === index) return;
    api.scrollTo(index);
    if (onChange) onChange(title);
  };

  const currentCard = Object.values(carouselCards)[carouselIndex];

  return (
    <section className="py-16" id="cardSelection">
      {!viewCard && (
        <h2 className="text-center lg:text-6xl md:text-4xl text-3xl font-bold mb-10">
          Pick a card to start
        </h2>
      )}
      <div className="w-full">
        <Carousel
          setApi={setApi}
          onMouseEnter={!viewCard ? plugin.current.stop : undefined}
          onMouseLeave={!viewCard ? plugin.current.reset : undefined}
          plugins={plugins as any}
          opts={{
            align: media ? "start" : "center",
            loop: true,
            startIndex:
              title && !viewCard
                ? Object.values(carouselCards).findIndex(
                    (c) => c.title === title
                  ) || 0
                : 0,
          }}
        >
          <CarouselContent>
            {Object.values(carouselCards).map((item, index) => (
              <CarouselItem
                key={index}
                onClick={() => onCardClick(item.title, index)}
                className={cn(
                  "md:basis-1/2 lg:basis-1/3 flex items-center justify-center rounded-md"
                )}
              >
                <div
                  className={cn(
                    "cursor-pointer relative xl:w-[24rem] xl:h-[20rem] h-[16rem] w-[15rem] aspect-video transition-all duration-500 ease-in-out",
                    index === carouselIndex && "scale-125"
                  )}
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
        </Carousel>
      </div>

      {!viewCard && currentCard && (
        <CardDetails key={carouselIndex} card={currentCard} />
      )}
    </section>
  );
};

export default TapUpCarousel;
