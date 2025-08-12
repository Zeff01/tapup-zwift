"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { carouselCards } from "@/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import CardDetails from "./card-details";
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
    <section className="py-16 md:py-24" id="cardSelection">
      {!viewCard && (
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            Pick a card to start
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of premium business card designs
          </p>
        </div>
      )}
      <div className="w-full px-6 sm:px-8 md:px-16 lg:px-24">
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
          <CarouselContent className="-ml-2 md:-ml-4">
            {Object.values(carouselCards).map((item, index) => (
              <CarouselItem
                key={index}
                onClick={() => onCardClick(item.title, index)}
                className={cn(
                  "pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 flex items-center justify-center"
                )}
              >
                <div
                  className={cn(
                    "cursor-pointer relative transition-all duration-700 ease-out transform-gpu",
                    index === carouselIndex
                      ? "scale-110 z-20"
                      : "scale-95 hover:scale-100"
                  )}
                >
                  <div className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] md:w-[360px] md:h-[220px] lg:w-[400px] lg:h-[240px] group">
                    <div
                      className={cn(
                        "absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur-xl transition-all duration-700",
                        index === carouselIndex
                          ? "opacity-40 animate-pulse"
                          : "opacity-0 group-hover:opacity-30"
                      )}
                    />
                    <div
                      className={cn(
                        "relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-500",
                        index === carouselIndex
                          ? "shadow-2xl ring-4 ring-green-400/20"
                          : "hover:shadow-2xl"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {!viewCard && currentCard && (
        <div className="mt-16">
          <CardDetails key={carouselIndex} card={currentCard} />
        </div>
      )}
    </section>
  );
};

export default TapUpCarousel;
