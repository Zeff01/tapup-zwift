import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import tapUpCard from "@/public/assets/tapUp-card1.png";
import tapUpCard2 from "@/public/assets/tapUp-card2.png";
import tapUpCard3 from "@/public/assets/tapUp-card3.png";
import tapUpCard4 from "@/public/assets/tapUp-card4.png";
import tapUpCard5 from "@/public/assets/tapUp-card5.png";
import Image from "next/image";
import CardDetails from "./card-details";

const carouselCards = [
  tapUpCard,
  tapUpCard2,
  tapUpCard3,
  tapUpCard4,
  tapUpCard5,
];

const TapUpCarousel = () => {
  return (
    <section className="py-[7rem] shadow-xl">
      <div className="w-full mx-auto flex items-center justify-center">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {carouselCards.map((item, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 flex items-center rounded-md`}
              >
                <div className="cursor-pointer">
                  <Image
                    src={item}
                    alt={`card ${index}`}
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <CardDetails />
    </section>
  );
};

export default TapUpCarousel;
