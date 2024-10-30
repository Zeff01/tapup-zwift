"use client";

import { Button } from "@/components/ui/button";
import { ADMIN_ONLY_ROUTE, USER_ROLE_ENUMS } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext();
  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <div className="w-full relative">
        {user?.role === USER_ROLE_ENUMS.ADMIN && (
          <Link href={ADMIN_ONLY_ROUTE}>
            <Button variant="outline" className="absolute top-0 left-0">
              Admin Dashboard
            </Button>
          </Link>
        )}
        <h1 className="text-white text-6xl text-center font-bold">Dashboard</h1>
      </div>
    </main>
  );
}
