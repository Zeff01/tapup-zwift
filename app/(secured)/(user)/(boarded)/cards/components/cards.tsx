"use client";

import React from "react";
import DigitalCard from "@/components/DigitalCard";
const Cards = () => {
  return (
    <div className="top-20 lg:top-10 relative mx-10">
      <div className="flex items-center justify-between ">
        <h1 className="my-4 text-2xl md:text-4xl font-semibold">MY CARDS</h1>
        <button className="text-primary-foreground bg-green-500 rounded-lg py-3 px-5  md:text-lg m-2">
          + Create
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
        <DigitalCard />
      </div>
    </div>
  );
};

export default Cards;
