"use client";

import React from "react";
import DigitalCard from "@/components/DigitalCard";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery } from "@tanstack/react-query";
import { getCardsByOwner } from "@/lib/firebase/actions/card.action";
import Loading from "@/src/app/loading";
import { useConfirm } from "@/hooks/useConfirm";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const Cards = () => {
  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const { data: cards, status } = useQuery({
    queryKey: ["cards", user?.uid],
    queryFn: () => getCardsByOwner(user?.uid!),
    staleTime: 1000 * 60 * 5,
  });

  if (status === "pending") return <Loading />;

  return (
    <>
      <ConfirmDialog />
      <div className="px-4 flex flex-col min-h-full md:px-16 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold">MY CARDS</h1>

          <div className="flex">
            <Link
              href={"/cards/cardShop"}
              className="text-primary-foreground mr-4 bg-green-500 rounded-lg md:text-lg px-6 py-2"
            >
              Buy a Card
            </Link>
            <div className="flex items-center justify-center">

            <ShoppingBag
              onClick={() => router.push("/orders")}
              size={36}
              className="cursor-pointer"
              />
              </div>
          </div>
        </div>
        {/* grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] */}
        {/* grid-cols-[200px,fit-content(40rem),1fr] */}
        <div className="grid justify-center grid-cols-[repeat(auto-fill,minmax(18rem,24rem))] justify-items-center xl:justify-start xl:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4 mt-8">
          {cards && cards.length > 0 ? (
            cards.map((card) => (
              <DigitalCard
                user={user}
                confirm={confirm}
                key={card.id}
                card={card}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-greenTitle mb-4">
                  No Cards Yet
                </h2>
                <p className="text-base md:text-lg text-grayDescription text-center mb-8 max-w-md">
                  Create your first digital business card to get started!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cards;
