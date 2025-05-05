import React from "react";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound } from "next/navigation";

import { getAllUsers, getUserById } from "@/lib/firebase/actions/user.action";
import { getCardsByOwner } from "@/lib/firebase/actions/card.action";
import TableComponent from "../_components/CardsTable/TableComponent";
import { Card, ExtendedUserInterface } from "@/types/types";
import { UserCard } from "../_components/UserCard";

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
  const [cards, user] = await Promise.all([
    getCardsByOwner(userId),
    getUserById(userId),
  ]);

  return (
    <main className="flex h-full flex-col p-4">
      <UserCard user={user as ExtendedUserInterface} />
      <div className="mt-6 ">
        <TableComponent users={cards as Card[]} />
      </div>
    </main>
  );
}
