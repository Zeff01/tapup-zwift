import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="flex justify-center gap-7 h-[4rem] ">
      <div className="flex items-center gap-1 ">
        <MdOutlineEmail className="text-[#1A1919CC]" />
        <h2 className="text-[#1A1919CC] text-xs md:text-base">
          paulcastellano@gmail.com
        </h2>
      </div>
      <div className="flex items-center gap-1">
        <FiPhoneCall className="text-[#1A1919CC]" />
        <h2 className="text-[#1A1919CC] text-xs md:text-base">+63998446546</h2>
      </div>
    </footer>
  );
};

export default Footer;
