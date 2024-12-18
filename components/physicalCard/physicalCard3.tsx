"use client";

import { Card } from "@/types/types";
import { CardContainer } from "@/components/ui/3Dcard";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import FrontCard from "./components/FrontCard";
import BackCard from "./components/BackCard";
import card1Bg from "@/public/assets/card1-bg.png";
import { useState } from "react";

const PhysicalCard3 = ({
  profilePictureUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  websiteUrl,
}: Card) => {
  const userProfile = {
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    profilePictureUrl,
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <CardContainer containerClassName="w-full max-w-[434px] aspect-[16/10] mx-auto">
      <div
        className={`
          relative w-full h-full 
          transition-transform duration-500 
          [transform-style:preserve-3d] 
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* Front of card */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${!isFlipped ? "z-10" : "z-0"}
          `}
        >
          <FrontCard backgroundImage={card1Bg} color="white" />
        </div>

        {/* Back of card */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${isFlipped ? "z-10" : "z-0"}
            [transform:rotateY(180deg)] 
          `}
        >
          <BackCard
            data={userProfile}
            backgroundImage={card1Bg}
            color="white"
          />
        </div>
      </div>

      {/* Flip Button */}
      <div className="absolute top-2 left-2">
        <Button variant="outline" size="icon" onClick={handleFlip}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </CardContainer>
  );
};

export default PhysicalCard3;
