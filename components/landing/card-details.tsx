import { CarouselCard } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { BiPurchaseTag } from "react-icons/bi";

interface CardDetailsProps {
  card: CarouselCard;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center lg:text-left">
          {card?.title}
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2 text-center lg:text-left">
          ₱ {card?.price}
        </p>
      </div>

      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
        {card?.description}
      </p>

      <Link href={`/card?title=${card?.title}`} className="inline-block">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Purchase This Card
          <BiPurchaseTag className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
};

export default CardDetails;
