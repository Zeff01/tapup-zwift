"use client";

import { useUserContext } from "@/providers/user-provider";
import React from "react";

import { redirect } from "next/navigation";
import {
  DASHBOARD_ROUTE,
  ONBOARDING_ROUTE,
  USER_ROLE_ENUMS,
} from "@/constants";
import Loading from "@/src/app/loading";
import AdminNavigation from "@/components/boarded/AdminNavigation";
import TopbarBoarded from "@/components/boarded/topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, notifications, isLoading, logOutUser } = useUserContext();

  const notif = notifications ?? [];

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }

  if (user && (user.onboarding === false || !user.onboarding)) {
    redirect(ONBOARDING_ROUTE);
  }

  if (user.role !== USER_ROLE_ENUMS.ADMIN) {
    redirect(DASHBOARD_ROUTE);
  }

  return (
    <main className="flex-1 flex">
      <AdminNavigation notifications={notif} user={user} signOut={logOutUser} />
      <div className="w-full lg:w-[calc(100%-25rem)] ease-in-out transition-all ml-auto flex flex-col">
        <TopbarBoarded notifications={notif} user={user} signOut={logOutUser} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
