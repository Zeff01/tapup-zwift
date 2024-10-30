"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";
import { useUserContext } from "@/providers/user-provider";
import { redirect } from "next/navigation";
import Loading from "./loading";
import { DASHBOARD_ROUTE, USER_ROLE_ENUMS } from "@/constants";

export default function UsersPage() {
  const { user, isLoading: userContextLoading } = useUserContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const users = await getAllUsers();
      const allUsers = JSON.parse(JSON.stringify(users));

      setData(allUsers);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (!user || (!user && userContextLoading)) {
    return <Loading />;
  }

  if (user.role !== USER_ROLE_ENUMS.ADMIN) {
    redirect(DASHBOARD_ROUTE);
  }

  return (
    <main className="flex h-full bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      {/* <Navbar /> */}
      <TableComponent users={data} isLoading={isLoading} />
    </main>
  );
}
