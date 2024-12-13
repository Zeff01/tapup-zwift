import { Card } from "@/types/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import FrontCard from "./components/FrontCard";
import BackCard from "./components/BackCard";
import card1Bg from "@/public/assets/card1-bg.png";
// Main Card Component
const PhysicalCard1 = ({ data }: { data: Partial<Card> }) => {
  console.log("data", data);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[434px] aspect-[16/10] relative flex justify-center items-center mx-auto">
      <div
        className={`
          relative w-full h-full 
          transition-transform duration-500 
          [transform-style:preserve-3d] 
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* Front of card (NFC/Tap Card) */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${!isFlipped ? "z-10" : "z-0"}
          `}
        >
          <FrontCard backgroundImage={card1Bg} />
        </div>

        {/* Back of card (Personal Details) */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${isFlipped ? "z-10" : "z-0"}
            absolute w-full h-full rounded-lg [backface-visibility:hidden] 
    [transform:rotateY(180deg)] bg-gradient-to-br from-foreground/90 
    via-green-900 to-foreground/90 border-2 border-purple-500
            
          `}
        >
          <BackCard data={{ ...data }} backgroundImage={card1Bg} />
        </div>
      </div>

      {/* Flip Button */}
      <div className="absolute top-2 left-2">
        <Button variant="outline" size="icon" onClick={handleFlip}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhysicalCard1;
