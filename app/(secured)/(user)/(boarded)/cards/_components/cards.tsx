"use client";

import React from "react";
import DigitalCard from "@/components/DigitalCard";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery } from "@tanstack/react-query";
import { getCardsByOwner } from "@/src/lib/firebase/store/card.action";
import Loading from "@/app/loading";

const Cards = () => {
  const { user } = useUserContext();
  const { data: cards, status } = useQuery({
    queryKey: ["cards", user?.uid],
    queryFn: () => getCardsByOwner(user?.uid!),
  });

  if (status === "pending") return <Loading />;

  return (
    <div className="top-20 lg:top-10 relative mx-10">
      <div className="flex items-center justify-between ">
        <h1 className="my-4 text-2xl md:text-4xl font-semibold">MY CARDS</h1>
        <Link
          href={"/cards/design-option"}
          className="text-primary-foreground bg-green-500 rounded-lg py-3 px-5  md:text-lg m-2"
        >
          + Create
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {cards?.map((card) => <DigitalCard key={card.id} card={card} />)}
      </div>
    </div>
  );
};

export default Cards;
