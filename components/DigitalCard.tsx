"use client";

import { UserState } from "@/providers/user-provider";
import { deleteCardById } from "@/src/lib/firebase/store/card.action";
import { Card } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Edit2, Link2, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Prop = {
  card: Partial<Card>;
  confirm: (title?: string, message?: string | JSX.Element) => Promise<unknown>;
  user: UserState;
};

const DigitalCard = ({ card, confirm, user }: Prop) => {
  const domain =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
      : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteCardMutation } = useMutation({
    mutationFn: deleteCardById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      toast.success("Card deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const handleDelete = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!card.id) return;
    e.stopPropagation();
    const ok = await confirm(
      undefined,
      <>
        Are you sure you want to delete
        <br />
        <span className="font-bold text-destructive">
          {card.firstName + " " + card.lastName}{" "}
        </span>
        card?
      </>
    );

    if (!ok) return;
    deleteCardMutation({ cardId: card.id });
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!card.id) return;
    e.stopPropagation();
    router.push(`/cards/update/${card.id}`);
  };
  const handleCopy = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${domain}/user/${card.id}`);
    toast.success("Copied to clipboard");
  };

  const iconAndFunctionMap = [
    {
      icon: Trash,
      fn: handleDelete,
    },
    {
      icon: Edit2,
      fn: handleUpdate,
    },
    {
      icon: Copy,
      fn: handleCopy,
    },
  ];
  return (
    <div className="w-full aspect-[340/208] hover:scale-105 transition-transform duration-200 flex justify-between text-white bg-neutral-950 rounded-[30px] overflow-hidden">
      <Link
        href={`/cards/${card.id}`}
        prefetch
        className="flex-1 border-r border-accent/40 p-6"
      >
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <p className="text-[clamp(1.1rem,1.4vw,1.4rem)] font-semibold capitalize">
              {card.firstName + " " + card.lastName}
            </p>
            <p className="text-xs capitalize">{card.position}</p>
          </div>
          {/* <p className="text-xs mt-4">{`${publicDomain}/profile/${card.id}`}</p> */}
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center bg-neutral-950 hover:bg-neutral-900 transition">
        {iconAndFunctionMap.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={index}
              className="p-3 hover:opacity-30 cursor-pointer"
              onClick={item.fn}
            >
              <Icon className="size-4" />
            </span>
          );
        })}
        <Link
          href={`/user/${card.id}`}
          className="p-3 hover:opacity-30 cursor-pointer"
          prefetch
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link2 className="size-4" />
        </Link>
      </div>
    </div>
  );
};

export default DigitalCard;
