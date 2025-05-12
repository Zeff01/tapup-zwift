"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import CardDetails from "./card-details";
import React, { useRef } from "react";
import { carouselCards } from "@/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "usehooks-ts";

import { type CarouselApi } from "@/components/ui/carousel";
import { CarouselCardKey } from "@/types/types";
import { useSearchParams } from "next/navigation";

interface Params {
  viewCard?: boolean;
  onChange?: (title: string) => void;
}

const TapUpCarousel = ({ viewCard, onChange }: Params) => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const start = useRef(
    Object.values(carouselCards).findIndex((card) => card.title === title) || 0
  );

  const media = useMediaQuery("(max-width: 1024px)");

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const plugins = React.useMemo(() => {
    return !viewCard ? [plugin.current] : [];
  }, [viewCard]);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    if (media) {
      setCurrent(api.selectedScrollSnap() + 2);
      if (onChange) {
        onChange(
          carouselCards[
            `card${api.selectedScrollSnap() + 2}` as CarouselCardKey
          ]?.title
        );
      }
    } else {
      setCurrent(() => {
        if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
          if (onChange) {
            onChange(carouselCards[`card${1}` as CarouselCardKey]?.title);
          }
          return 1;
        }
        if (onChange) {
          onChange(
            carouselCards[
              `card${api.selectedScrollSnap() + 2}` as CarouselCardKey
            ]?.title
          );
        }
        return api.selectedScrollSnap() + 2;
      });
    }
    api.on("select", () => {
      if (media) {
        setCurrent(api.selectedScrollSnap() + 1);
        if (onChange) {
          onChange(
            carouselCards[
              `card${api.selectedScrollSnap() + 1}` as CarouselCardKey
            ]?.title
          );
        }
        return;
      }
      setCurrent(() => {
        if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
          if (onChange) {
            onChange(carouselCards[`card${1}` as CarouselCardKey]?.title);
          }
          return 1;
        }
        if (onChange) {
          onChange(
            carouselCards[
              `card${api.selectedScrollSnap() + 2}` as CarouselCardKey
            ]?.title
          );
        }
        return api.selectedScrollSnap() + 2;
      });
    });
  }, [api, media]);

  const onCardClick = (title: string, index: number) => {
    if (!api) return;

    // possible current card already selected
    if ((current - index) == 1) return;

    if (onChange) {
      onChange(title);
      api.scrollTo(index - 1);
    }
  }

  return (
    <section className="py-16" id="cardSelection">
      {!viewCard && (
        <h2 className="text-center lg:text-6xl md:text-4xl text-3xl font-bold mb-10 ">
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
            align: "start",
            loop: true,
            startIndex: viewCard
              ? start.current - 1 < 0
                ? 10
                : start.current - 1
              : 0,
          }}
        >
          <CarouselContent>
            {Object.values(carouselCards).map((item, index) => (
              <CarouselItem
                key={index}
                onClick={()=>onCardClick(item.title, index)}
                className={cn(
                  "md:basis-1/2 lg:basis-1/3 flex items-center justify-center rounded-md"
                  // {
                  //   "lg:basis-[25%]": viewCard,
                  // }
                )}
              >
                <div
                  className={cn(
                    "cursor-pointer relative xl:w-[24rem] xl:h-[20rem] h-[16rem] w-[15rem] aspect-video transition-all duration-500 ease-in-out",
                    !media && index + 1 === current && "scale-125",
                    media && index === current && "scale-125"
                    // viewCard && "xl:w-[18rem] xl:h-[14rem]"
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
      {!viewCard && (
        <CardDetails
          key={current}
          card={carouselCards[`card${current}` as CarouselCardKey]}
        />
      )}
    </section>
  );
};

export default TapUpCarousel;
