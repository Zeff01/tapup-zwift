"use client";

import { UserContextProvider } from "@/providers/user-provider";
import React from "react";

const SecuredLayout = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default SecuredLayout;
