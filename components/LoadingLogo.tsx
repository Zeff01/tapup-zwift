"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import GridLoader from "react-spinners/GridLoader";

// const GridLoader = dynamic(() => import("react-spinners/GridLoader"));

export default function LoadingLogo() {
  return (
    <div className="bg-background flex flex-col items-center justify-center h-[100dvh]">
      <div className="flex flex-col items-center">
        <GridLoader size={20} color="#6150EB" />
        <Image
          src="/assets/zwift-logo.png"
          alt="Company Logo"
          width={150}
          height={150}
          priority
          className="mx-auto mt-4"
        />
      </div>
    </div>
  );
}
