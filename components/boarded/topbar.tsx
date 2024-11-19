import React from "react";
import TapupLogo from "../svgs/TapupLogo";
import OverlayMenu from "../NavigationInside";

const TopbarBoarded = () => {
  return (
    <div className="flex lg:hidden py-4 px-4 sticky top-0 z-50 bg-background items-center ">
      <TapupLogo />
      <span className="absolute -translate-y-1/2 top-1/2 right-4">
        <OverlayMenu />
      </span>
    </div>
  );
};

export default TopbarBoarded;
