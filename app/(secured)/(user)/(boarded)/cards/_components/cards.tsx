"use client";

import React from "react";
import DigitalCard from "@/components/DigitalCard";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery } from "@tanstack/react-query";
import { getCardsByOwner } from "@/src/lib/firebase/store/card.action";
import Loading from "@/app/loading";
import { useConfirm } from "@/hooks/useConfirm";

const Cards = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const { data: cards, status } = useQuery({
    queryKey: ["cards", user?.uid],
    queryFn: () => getCardsByOwner(user?.uid!),
  });

  if (status === "pending") return <Loading />;

  return (
    <>
      <ConfirmDialog />
      <div className="px-4 flex flex-col min-h-full md:px-16 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold">MY CARDS</h1>
          <Link
            href={"/cards/design-option"}
            className="text-primary-foreground bg-green-500 rounded-lg md:text-lg px-6 py-2"
          >
            + Create
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] justify-items-center gap-4 mt-8">
          {cards?.map((card) => (
            <DigitalCard
              user={user}
              confirm={confirm}
              key={card.id}
              card={card}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
