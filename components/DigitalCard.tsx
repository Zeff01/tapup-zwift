"use client";

import { UserState } from "@/providers/user-provider";
import { deleteCardById } from "@/src/lib/firebase/store/card.action";
import { Card } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Router, Trash, View, Link2, Copy } from "lucide-react";
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
  const handleDelete = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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

  const handleUpdate = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!card.id) return;
    e.stopPropagation();
    router.push(`/cards/update/${card.id}`);
  };
  const handleCopy = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
  };
  const handleLink = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <div className="w-full max-w-[320px] sm:max-w-none sm:h-full aspect-[340/208] hover:scale-105 transition-transform duration-200 flex justify-between text-white bg-black rounded-[30px]">
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
      <div className="flex flex-col px-4 py-6 justify-between items-center">
        <Trash
          size={20}
          onClick={handleDelete}
          className="cursor-pointer hover:text-destructive "
        />
        <Edit2 size={20} className="cursor-pointer" onClick={handleUpdate} />
        <Copy size={20} onClick={handleCopy} />
        <Link2 size={20} onClick={handleLink} />
      </div>
    </div>
  );
};

export default DigitalCard;
