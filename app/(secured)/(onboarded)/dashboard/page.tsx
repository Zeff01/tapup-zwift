"use client";

import { useUserContext } from "@/providers/user-provider";
import Loading from "../../../loading";
import { redirect } from "next/navigation";
import { ONBOARDING_ROUTE } from "@/constants";

export default function Home() {
  const { user, isLoading } = useUserContext();

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }

  if (user && (user.onboarding === false || !user.onboarding)) {
    redirect(ONBOARDING_ROUTE);
  }
  return (
    <main className="  flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <div className="max-w-sm w-full">
        <h1 className="text-white text-6xl text-center font-bold">Dashboard</h1>
      </div>
    </main>
  );
}
