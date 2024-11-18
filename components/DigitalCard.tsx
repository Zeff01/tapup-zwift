import { publicDomain } from "@/constants";
import { Card, UserProfile } from "@/types/types";
import { User } from "firebase/auth";
import React from "react";
import { FiCopy, FiLink } from "react-icons/fi";

type Prop = {
  card: Partial<Card>;
};

const DigitalCard = ({ card }: Prop) => {
  return (
    <div className="w-[300px] h-[165px] flex justify-between text-white bg-black p-6 rounded-[30px]">
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-2xl font-semibold capitalize">
            {card.firstName + " " + card.lastName}
          </p>
          <p className="text-sm capitalize">{card.position}</p>
        </div>
        {/* <p className="text-xs mt-4">{`${publicDomain}/profile/${card.id}`}</p> */}
      </div>
      <div className="flex flex-col justify-between items-center">
        <FiCopy size={24} />
        <FiLink size={24} />
      </div>
    </div>
  );
};

export default DigitalCard;
