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

  return (
    <div className="flex lg:hidden py-4 px-4 sticky top-0 z-50 bg-background items-center ">
      {pathname === "/dashboard" ? (
        <h1 className="text-xl">My Account</h1>
      ) : (
        <TapupLogo />
      )}
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
