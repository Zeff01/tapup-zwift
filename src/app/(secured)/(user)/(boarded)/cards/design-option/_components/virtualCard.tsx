"use client";

import { IoArrowBack } from "react-icons/io5";
import { FaScrewdriverWrench } from "react-icons/fa6";

import logo from "@/public/assets/tap-up-logo-white.png";
import templates from "@/public/images/templates.png";
import Image from "next/image";
import grids from "@/public/images/grid.png";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TapupLogo from "@/components/svgs/TapupLogo";
import ComingSoon from "@/components/ComingSoon";

export default function VirtualCard() {
  const [openComingSoon, setOpenComingSoon] = useState(false);
  const router = useRouter();
  const handleUseTemplate = () => {
    router.push("/cards/create");
  };
  const handleOpenComingSoon = () => {
    setOpenComingSoon(true);
  }
  return (
    <div className="flex relative flex-col h-full  w-full text-primary px-5">
      {openComingSoon ? <div>
         <Link
          href={"/cards"}
          className="absolute top-5 left-5 text-3xl text-primary"
        >
          <IoArrowBack />
        </Link>
        <ComingSoon /> 
        </div>
        : (
      <div>
          
      <div className=" flex flex-shrink flex-col items-center justify-center gap-y-9 py-10">
        <Link
          href={"/cards"}
          className="absolute top-5 left-5 text-3xl text-primary"
        >
          <IoArrowBack />
        </Link>
        <TapupLogo className="mt-6" />
        <h1 className="font-semibold text-2xl md:text-3xl xl:text-4xl w-full text-start md:text-center">
          Create new virtual card
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-y-4 gap-x-4 w-full flex-grow pb-4">
        <div
          className=" flex justify-center md:justify-end items-start w-full flex-1"
          onClick={handleUseTemplate}
        >
          {/* <Input/> */}
          <div className=" flex flex-col gap-y-2 min-h-[400px] rounded-md border cursor-pointer hover:border-green-500 transition-colors duration-300 py-16 px-12">
            <Image
              className=""
              src={templates}
              alt="templates img"
              height={400}
              width={400}
              />
            <h1 className=" text-center font-medium  text-xl">
              Use a template
            </h1>
            <p className="text-muted-foreground text-center">
              Choose from our prebuilt templates.
            </p>
          </div>
        </div>

        <div className=" flex justify-center md:justify-start items-start w-full flex-1">
          {/* <Input/> */}
          <div className=" flex flex-col gap-y-2 min-h-[400px] rounded-md border cursor-pointer hover:border-green-500 transition-colors duration-300 py-16 px-12" onClick={handleOpenComingSoon}>
            <div className="relative">
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white  border  md:dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] shadow-[0_0_30px_30px_rgba(255,255,255,1)] dark:bg-black text-primary rounded-md">
                <FaScrewdriverWrench className="text-xl text-slate-400" />
              </button>
              <Image
                className=""
                src={grids}
                alt="grids"
                height={390}
                width={390}
              />
            </div>
          

            <h1 className=" text-center font-medium  text-xl">
              Build your own
            </h1>
            <p className="text-muted-foreground text-center">
              Design your own virtual card using our{" "}
              <span className="block">card builder.</span>
            </p>
          </div>
        </div>
      </div>
                </div>
      )}
    </div>
  );
}
