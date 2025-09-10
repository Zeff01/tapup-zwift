import React from "react";
import { getAllUsers } from "@/lib/firebase/actions/user.action";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound, redirect } from "next/navigation";
import UserManagementDashboard from "./_components/UserManagementDashboard";

export default async function UsersPage() {
  const auth = await authCurrentUserv2();

  if (!auth) {
    redirect("/login");
  }

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  return (
    <main className="flex h-full flex-col">
      <UserManagementDashboard users={allUsers} currentUser={auth} />
    </main>
  );
}