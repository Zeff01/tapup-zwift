"use client";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const fonts = Inter({
  subsets: ["latin"],
  weight: ["400", "200"],
});

export const LeftContentMsg = () => {
  return (
    <div className="flex flex-col justify-end h-full">
      <h1 className={cn(fonts.className, "text-[39px] font-normal")}>
        Eliminate financial worries with Tap Up's assistance.
      </h1>
      <p className={cn(fonts.className, "text-[20px] font-extralight ")}>
        Manage your finances effortlessly and swiftly with Tap Up.
      </p>
    </div>
  );
};
