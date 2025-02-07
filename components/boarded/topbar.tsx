"use client";

import React from "react";
import TapupLogo from "../svgs/TapupLogo";
import OverlayMenu from "./NavigationInside";
import { Notifications, UserState } from "@/types/types";
import { usePathname } from "next/navigation";

type Props = {
  notifications: Notifications;
  user: UserState;
  signOut: () => void;
};

const TopbarBoarded = ({ notifications, user, signOut }: Props) => {
  const pathname = usePathname();

  const handleSwitch = () => {
    if (pathname.includes('/orders')){
       return <h1 className="text-xl font-semibold">Orders</h1>;
    }
   switch (pathname) {
          case "/dashboard":
            return <h1 className="text-xl font-semibold">My Account</h1>;
          default:
            return <TapupLogo/>
        }
}

  return (
    <div className="flex lg:hidden py-4 px-4 sticky top-0 z-50 bg-background items-center ">
      {handleSwitch()}
      <span className="absolute -translate-y-1/2 top-1/2 right-4">
        <OverlayMenu
          notifications={notifications}
          user={user}
          signOut={signOut}
        />
      </span>
    </div>
  );
};

export default TopbarBoarded;
