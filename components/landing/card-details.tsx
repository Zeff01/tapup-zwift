import { CarouselCard } from "@/types/types";
import { Button } from "../ui/button";

interface CardDetailsProps {
  card: CarouselCard;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  return (
    <section className="mt-[2rem]  mx-auto w-[80vw]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black">
        {card?.title}
      </h2>

      <pre className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl text-muted-foreground text-justify mt-6 whitespace-pre-line font-sans mx-auto h-56 p-4 rounded-md border shadow-lg">
        {card?.description}
      </pre>

      <Button className="uppercase max-w-[15rem] py-6 w-full bg-green-600 mt-[27px] font-bold flex text-background items-center mx-auto hover:bg-green-700">
        Get a card
      </Button>
    </section>
  );
};

export default CardDetails;
