"use client";

import { useUserContext } from "@/providers/user-provider";
import React from "react";
import Loading from "../../../loading";
import { redirect } from "next/navigation";
import { ONBOARDING_ROUTE } from "@/constants";
import NavigationBoarded from "@/components/boarded/navigation";
import OverlayMenu from "@/components/NavigationInside";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, logOutUser } = useUserContext();

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }

  if (user && (user.onboarding === false || !user.onboarding)) {
    redirect(ONBOARDING_ROUTE);
  }

  return (
    <main className="flex-1 flex">
      <NavigationBoarded user={user} signOut={logOutUser} />
      <OverlayMenu />
      <div className="w-full lg:w-[calc(100%-25rem)] ease-in-out transition-all ml-auto flex">
        {children}
      </div>
    </main>
  );
};

export default Layout;
