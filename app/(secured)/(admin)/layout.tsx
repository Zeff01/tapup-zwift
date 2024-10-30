"use client";

import { useUserContext } from "@/providers/user-provider";
import React from "react";

import { redirect } from "next/navigation";
import {
  DASHBOARD_ROUTE,
  ONBOARDING_ROUTE,
  USER_ROLE_ENUMS,
} from "@/constants";
import Loading from "@/app/loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUserContext();

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }

  if (user && (user.onboarding === false || !user.onboarding)) {
    redirect(ONBOARDING_ROUTE);
  }

  if (user.role !== USER_ROLE_ENUMS.ADMIN) {
    redirect(DASHBOARD_ROUTE);
  }

  return <>{children}</>;
};

export default Layout;
