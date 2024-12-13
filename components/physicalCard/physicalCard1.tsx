import { Card } from "@/types/types";
import card1Bg from "@/public/assets/card1-bg.png";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const PhysicalCard1 = (data: Partial<Card>) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full relative border border-blue-500 flex justify-center h-full items-center">
      <div className="absolute top-1 right-0 md:top-1/4 md:right-5 border border-blue-500">
        <Button onClick={handleFlip}>
          <RefreshCcw />
        </Button>
      </div>
      {/* Front */}
      <div
        className={`relative aspect-[16/10] w-full max-w-[434px] h-auto md:h-[271px] mx-5 border border-blue-500 transition-transform duration-500 ${isFlipped ? "transform rotate-y-180" : ""}`}
      >
        <Image
          src={card1Bg}
          alt="Card Background"
          fill
          className="object-cover"
          priority
        />

        <div
          className={`absolute inset-0 flex items-center justify-center z-10 ${isFlipped ? "hidden" : ""}`}
        >
          <div className="text-white text-center text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] px-4">
            {data.firstName || "Your Title Here"}
          </div>
        </div>
      </div>
      {/* Back */}
      <div
        className={`relative aspect-[16/10] w-full max-w-[434px] h-auto md:h-[271px] mx-5 border border-blue-500 transition-transform duration-500 ${isFlipped ? "transform rotate-y-180" : ""}`}
      >
        <Image
          src={card1Bg}
          alt="Card Background"
          fill
          className="object-cover"
          priority
        />

        {/* Back */}
        <div
          className={`absolute inset-0 flex items-center justify-center z-10 ${isFlipped ? "" : "hidden"}`}
        >
          <div className="text-white text-center text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] px-4">
            {data.lastName || "Your Title Here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalCard1;
