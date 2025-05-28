import React from "react";
import TapupLogo from "../svgs/TapupLogo";
import OverlayMenu from "./NavigationInside";

const TopbarBoarded = () => {
  return (
    <div className="flex lg:hidden py-4 border-b px-4 sticky top-0 z-50 bg-transparent backdrop-blur-xl items-center ">
      <div className="w-20 lg:w-28 aspect-[130/48]">
        <TapupLogo />
      </div>
      <span className="absolute -translate-y-1/2 top-1/2 right-4">
        <OverlayMenu />
      </span>
    </div>
  );
};

export default TopbarBoarded;
