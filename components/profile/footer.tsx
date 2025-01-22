import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { Card } from "@/types/types";

const Footer = ({ firstName, lastName, number }: Partial<Card>) => {
  return (
    <footer className="flex justify-evenly h-[4rem] max-w-[320px] mx-auto shadow-xl text-black">
      <div className="flex items-center gap-1 ">
        <MdOutlineEmail />
        <h2 className=" text-xs md:text-base">
          {firstName ? firstName + " " + lastName : "Anonymous"}
        </h2>
      </div>
      <div className="flex items-center gap-1">
        <FiPhoneCall />
        <h2 className="text-xs md:text-base">{number || "+63123456789"}</h2>
      </div>
    </footer>
  );
};

export default Footer;
