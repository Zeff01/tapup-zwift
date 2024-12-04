"use client";

import React from "react";
import { Camera } from "lucide-react"; // Import camera icon from lucide-react

const Page = () => {
  const handleCameraClick = () => {
    console.log("Camera opened");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full relative ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 dark:text-green-400">
        Scan your card
      </h2>
      <button
        onClick={handleCameraClick}
        className="focus:outline-none absolute bottom-12 sm:bottom-10 md:bottom-8"
      >
        <Camera className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-green-500 dark:text-green-400" />
      </button>
    </div>
  );
};

export default Page;
