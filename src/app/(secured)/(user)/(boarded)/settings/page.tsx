import ComingSoon from "@/components/ComingSoon";
import { USER_ROLE_ENUMS } from "@/constants";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function SettingPage() {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }

  return <ComingSoon />;
}
