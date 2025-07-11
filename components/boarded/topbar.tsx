import React from "react";
import TapupLogo from "../svgs/TapupLogo";
import OverlayMenu from "./NavigationInside";
import Cart from "../cart/Cart";
import Link from "next/link";

const TopbarBoarded = () => {
  return (
    <div className="flex justify-between lg:hidden py-4 border-b px-4 sticky top-0 z-[1000] bg-transparent backdrop-blur-xl items-center ">
      <Link href={"/dashboard"}>
        {" "}
        <div className="w-20 lg:w-28 aspect-[130/48]">
          <TapupLogo />
        </div>{" "}
      </Link>
      <div className="flex gap-4 items-center">
        <div className="pr-2">
          <Cart />
        </div>
        <span className="">
          <OverlayMenu />
        </span>
      </div>
    </div>
  );
};

export default TopbarBoarded;
