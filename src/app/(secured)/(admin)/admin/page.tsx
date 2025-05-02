import React from "react";
import { getAllUsers } from "@/lib/firebase/actions/user.action";
import TableComponent from "./_components/TableComponent";

export default async function UsersPage() {
  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  return (
    <main className="flex h-full bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <TableComponent users={allUsers} />
    </main>
  );
}
