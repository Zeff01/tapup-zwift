import { CarouselCard } from "@/types/types";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

interface CardDetailsProps {
  card: CarouselCard;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  return (
    <section className="mt-[2rem]  mx-auto w-[80vw]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black">
        {card?.title}
      </h2>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3vw] leading-tight md:leading-none text-center font-bold text-greenText my-3">
        ₱ {card?.price}
      </h2>
      <pre className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl text-muted-foreground text-justify mt-6 whitespace-pre-line font-sans mx-auto h-56 p-4 rounded-md ">
        {card?.description}
      </pre>

      <Link href="/signup">
        <Button className="uppercase max-w-[15rem] px-8 py-6 w-full text-white bg-buttonColor mt-[27px] font-bold flex items-center mx-auto hover:bg-hoverColor">
          Sign up & Activate
          <LogIn />
        </Button>
      </Link>
    </section>
  );
};

export default CardDetails;
