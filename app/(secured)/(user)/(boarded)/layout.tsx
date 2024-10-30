"use client";

import { useUserContext } from "@/providers/user-provider";
import React from "react";
import Loading from "../../../loading";
import { redirect } from "next/navigation";
import { ONBOARDING_ROUTE } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUserContext();

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }

  if (user && (user.onboarding === false || !user.onboarding)) {
    redirect(ONBOARDING_ROUTE);
  }

  return <>{children}</>;
};

export default Layout;
