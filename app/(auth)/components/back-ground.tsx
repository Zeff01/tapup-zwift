"use client";

import Image from "next/image";
import Logo from "@/public/images/logo.png";
import TapUp from "@/public/images/TapUp.png";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const fonts = Inter({
  subsets: ["latin"],
  weight: ["400", "200"],
});

export default function BackGround() {
  return (
    <div className="flex items-end bg-[#21C15C] w-full h-full relative rounded-md">
      <Image
        className="absolute left-5 top-5"
        src={Logo}
        alt="logo"
        height={125}
        width={125}
      />
      <div className="absolute top-0 -right-1/2 h-[450px] w-[600px] ">
        <Image fill src={TapUp} alt="Hero" />
      </div>

      <div className="p-5">
        <h1
          className={cn(
            fonts.className,
            "font-normal text-2xl flex flex-col mb-2"
          )}
        >
          Eliminate financial worries with <span>Tap Up&#39;s assistance.</span>
        </h1>
        <p
          className={cn(fonts.className, "font-extralight  flex flex-col mb-2")}
        >
          Manage your finances effortlessly and swiftly
          <span>with Tap Up.</span>
        </p>
        <div className="flex gap-x-1">
          <hr className="border-t-4 w-2 rounded-full" />
          <hr className="border-t-4 w-2 rounded-full" />
          <hr className="border-t-4 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
