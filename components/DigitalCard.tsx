import React from "react";
import { FiCopy, FiLink } from "react-icons/fi";

const DigitalCard = () => {
  return (
    <div className="w-[300px] h-[165px] flex justify-between text-white bg-black p-6 rounded-[30px]">
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-2xl font-semibold">Julia V. Viray</p>
          <p className="text-sm">UI/UX Designer at TapUp</p>
        </div>
        <p className="text-xs mt-4">tapup.com/juliaviray</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <FiCopy size={24} />
        <FiLink size={24} />
      </div>
    </div>
  );
};

export default DigitalCard;
