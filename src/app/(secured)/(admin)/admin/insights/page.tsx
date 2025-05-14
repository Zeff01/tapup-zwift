import React from "react";
import { Construction } from "lucide-react";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound, redirect } from "next/navigation";

export default async function UsersOrdersPage() {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Under Development</h1>
        <p className="text-lg text-gray-400 mb-6">
          This page is currently being built. Please check back later!
        </p>
        <Construction className="w-16 h-16 mx-auto text-yellow-500" />
      </div>
    </main>
  );
}
