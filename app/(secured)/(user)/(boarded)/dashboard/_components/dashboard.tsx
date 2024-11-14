"use client";

import { Button } from "@/components/ui/button";
import { ADMIN_ONLY_ROUTE, USER_ROLE_ENUMS } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <div className="h-full">
      {user?.role === USER_ROLE_ENUMS.ADMIN && (
        <Link href={ADMIN_ONLY_ROUTE}>
          <Button variant="outline" className="absolute top-0 left-0">
            Admin Dashboard
          </Button>
        </Link>
      )}
      <div className="space-y-8 text-center">
        {Array.from({ length: 20 }).map((_, index) => (
          <h1 key={index} className="text-6xl font-bold">
            Dashboard
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
