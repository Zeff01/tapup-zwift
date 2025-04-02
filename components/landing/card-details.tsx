import { CarouselCard } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { BiPurchaseTag } from "react-icons/bi";

interface CardDetailsProps {
  card: CarouselCard;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  return (
    <section className="mt-[2rem]  mx-auto w-[80vw]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black">
        {card?.title}
      </h2>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2vw] leading-tight md:leading-none text-center font-bold text-greenText my-3">
        ₱ {card?.price}
      </h2>
      <pre className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl text-muted-foreground text-justify mt-6 whitespace-pre-line font-sans mx-auto h-56 p-4 rounded-md ">
        {card?.description}
      </pre>

      <Link href={`/card?title=${card?.title}`}>
        <Button className="uppercase max-w-[15rem] px-8 py-6 w-full text-white bg-buttonColor mt-[27px] font-bold flex items-center mx-auto hover:bg-hoverColor">
          Purchase Card
          <BiPurchaseTag />
        </Button>
      </Link>
    </section>
  );
};

export default CardDetails;
