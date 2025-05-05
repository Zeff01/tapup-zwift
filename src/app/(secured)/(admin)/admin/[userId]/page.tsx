import React from "react";
import { Construction } from "lucide-react";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound } from "next/navigation";

import { getAllUsers } from "@/lib/firebase/actions/user.action";
import { getCardsByOwner } from "@/lib/firebase/actions/card.action";
import TableComponent from "../_components/TableComponent";
import { ExtendedUserInterface } from "@/types/types";

export const revalidate = 0;

interface ViewUsersPageProps {
  params: {
    userId: string; // The dynamic route parameter
  };
}

export async function generateStaticParams() {
  const users = await getAllUsers();

  return users.map((users) => ({
    userId: users.id,
  }));
}

export default async function ViewUsersPage({ params }: ViewUsersPageProps) {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }
  const { userId } = params;

  const cards = await getCardsByOwner(userId);

  return (
    <main className="flex h-full flex-col p-4">
      <h1 className="text-xl sm:text-3xl font-bold">Cards per User</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Manage user roles, permissions, and account details.
      </p>
      <div className="mt-6">
        <TableComponent users={cards as ExtendedUserInterface[]} />
      </div>
    </main>
  );
}
