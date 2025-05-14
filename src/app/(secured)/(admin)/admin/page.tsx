import React from "react";
import { getAllUsers } from "@/lib/firebase/actions/user.action";
import TableComponent from "./_components/UsersTable/TableComponent";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound, redirect } from "next/navigation";

export default async function UsersPage() {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }

  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  return (
    <main className="flex h-full py-4 px-4 flex-col">
      <h1 className="text-xl sm:text-3xl font-bold">User Accounts</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Manage user roles, permissions, and account details.
      </p>
      <div className="mt-6">
        <TableComponent users={allUsers} />
      </div>
    </main>
  );
}
