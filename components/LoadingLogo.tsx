"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import GridLoader from "react-spinners/GridLoader";

// const GridLoader = dynamic(() => import("react-spinners/GridLoader"));

export default function LoadingLogo() {
  return (
    <div className="bg-background flex flex-col items-center justify-center h-[100dvh]">
      <div className="flex flex-col items-center gap-12 ">
        <Image
          src="/assets/tap-up-logo-white.png"
          alt="Company Logo"
          width={150}
          height={150}
          priority
          className="mx-auto mt-4 dark:block"
        />
        <div className='flex space-x-2 justify-center items-center gap-3 dark:invert'>
          <div className='h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-5 w-5 bg-black rounded-full animate-bounce'></div>
        </div>
      </div>
    </div>
  );
}
