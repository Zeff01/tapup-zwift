"use client";

import { CardContainer } from "@/components/ui/3Dcard";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import BackCard from "./BackCard";
import FrontCard1 from "./components/FrontCard1";

import { PhysicalCardProps } from "@/types/types";

const PhysicalCard = ({
  frontBackgroundImage,
  backBackgroundImage,
  profilePictureUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  websiteUrl,
  chosenPhysicalCard,
}: PhysicalCardProps) => {
  const userProfile = {
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    profilePictureUrl,
    chosenPhysicalCard,
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const renderFrontCard = () => {
    switch (chosenPhysicalCard?.id) {
      case "card1":
        return (
          <FrontCard1
            data={userProfile}
            backgroundImage={frontBackgroundImage}
            tapColor="text-white"
            upColor="text-greenTitle"
            nameColor="text-white"
            positionColor="text-white"
            iconColor="text-greenTitle"
            detailsColor="text-white"
          />
        );

      case "card2":
        return (
          <FrontCard1
            data={userProfile}
            backgroundImage={frontBackgroundImage}
            tapColor="text-black"
            upColor="text-greenTitle"
            nameColor="text-black"
            positionColor="text-black"
            iconColor="text-greenTitle"
            detailsColor="text-black"
          />
        );
      case "card3":
        return (
          <FrontCard1
            data={userProfile}
            backgroundImage={frontBackgroundImage}
            tapColor="text-black"
            upColor="text-white"
            nameColor="text-black"
            positionColor="text-black"
            iconColor="text-greenTitle"
            detailsColor="text-black"
          />
        );
      case "card4":
        return (
          <FrontCard1
            data={userProfile}
            backgroundImage={frontBackgroundImage}
            tapColor="text-white"
            upColor="text-greenTitle"
            nameColor="text-white"
            positionColor="text-white"
            iconColor="text-greenTitle"
            detailsColor="text-white"
          />
        );

      default:
        return null;
    }
  };

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
        {/* Back of card */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${!isFlipped ? "z-10" : "z-0"}
          `}
        >
          <BackCard backgroundImage={backBackgroundImage} color="white" />
        </div>

        {/* Front of card */}
        <div
          className={`
            absolute w-full h-full 
            [backface-visibility:hidden]
            ${isFlipped ? "z-10" : "z-0"}
            [transform:rotateY(180deg)] 
          `}
        >
          {renderFrontCard()}
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

export default PhysicalCard;
