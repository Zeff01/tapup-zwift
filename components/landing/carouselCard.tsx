"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import CardDetails from "./card-details";
import React from "react";
import { carouselCards } from "@/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "usehooks-ts";

import { type CarouselApi } from "@/components/ui/carousel";
import { CarouselCardKey } from "@/types/types";

const TapUpCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(2);

  const media = useMediaQuery("(max-width: 1024px)");

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
    if (media) {
      setCurrent(api.selectedScrollSnap() + 1);
    } else {
      setCurrent(api.selectedScrollSnap() + 2);
    }
    api.on("select", () => {
      if (media) {
        setCurrent(api.selectedScrollSnap() + 1);
        return;
      }
      setCurrent(() => {
        if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
          return 1;
        }
        return api.selectedScrollSnap() + 2;
      });
    });
  }, [api, media]);

  return (
    <section className="py-16">
      <div className="w-full">
        <Carousel
          setApi={setApi}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {Object.values(carouselCards).map((item, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 flex items-center justify-center rounded-md`}
              >
                <div
                  className={cn(
                    "cursor-pointer relative xl:w-[24rem] xl:h-[20rem] h-[16rem] w-[18rem] aspect-video transition-all duration-500 ease-in-out",
                    index + 1 === current && "scale-125"
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
      <CardDetails
        key={current}
        card={carouselCards[`card${current}` as CarouselCardKey]}
      />
    </section>
  );
};

export default TapUpCarousel;
