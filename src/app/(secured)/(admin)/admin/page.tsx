import React from "react";
import { getAllUsers } from "@/lib/firebase/actions/user.action";
import TableComponent from "./_components/TableComponent";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound } from "next/navigation";

export default async function UsersPage() {
  const auth = await authCurrentUserv2();

  if (auth.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  return (
    <main className="flex h-full bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <TableComponent users={allUsers} />
    </main>
  );
}
