import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import CardDetails from "./card-details";
import { useState } from "react";

const carouselCards = [
  {
    title: "Standard Black Card",
    image: "/assets/tapUp-card1.png"
  },
  {
    title: "Standard Yellow Card",
    image: "/assets/tapUp-card2.png"
  },
  {
    title: "Standard Blue Card",
    image: "/assets/tapUp-card3.png"
  },
  {
    title: "Standard Dark Blue Card",
    image: "/assets/tapUp-card4.png"
  },
  {
    title: "Standard Special Card",
    image: "/assets/tapUp-card5.png"
  }
];

interface CarouselCard{
  title: string;
  image: string;
}

const TapUpCarousel: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<CarouselCard>(carouselCards[0]);

  const handleClickCard = (card:CarouselCard) => {
    setCurrentCard(card);
  }
  return (
    <section className="py-[5rem] shadow-xl">
      <div className="w-full">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {carouselCards.map((item, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 lg:basis-1/3 flex items-center justify-center rounded-md`}
              >
                <div className="cursor-pointer relative xl:w-[24rem] w-[20rem] xl:h-[20rem] h-[18rem] aspect-video"
                onClick={()=>handleClickCard(item)}>
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
      <CardDetails title={currentCard.title} />
    </section>
  );
};

export default TapUpCarousel;
