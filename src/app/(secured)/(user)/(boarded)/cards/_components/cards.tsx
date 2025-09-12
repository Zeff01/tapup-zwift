"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  getCardsByOwner,
  transferCardOwnershipUsingCode,
} from "@/lib/firebase/actions/card.action";
import { updateUserCardOrdering } from "@/lib/firebase/actions/user.action";
import { sortCards } from "@/lib/utils";
import Loading from "@/src/app/loading";
import { useConfirm } from "@/hooks/useConfirm";
import * as Dialog from "@radix-ui/react-dialog";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/types/types";
import SortableCards from "./SortableCards";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

const Cards = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferCode, setTransferCode] = useState("");
  const [loadTransferCode, setLoadTransferCode] = useState(false);
  const [orderedCards, setOrderedCards] = useState<Card[]>([]);
  let ctxTimeout: any = null;

  const { data: cards, status } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["cards", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User UID is undefined");

      const cards = await getCardsByOwner(user.uid);
      
      const sortedCards = await sortCards(cards, user.uid);
      return sortedCards;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (cards) setOrderedCards(cards);
  }, [cards]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 2,
      },
    })
  );

  const dndModifiers = useMemo(() => {
    const base = [restrictToParentElement];
    return isMobile ? [restrictToVerticalAxis, ...base] : base;
  }, [isMobile]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedCards.findIndex((c) => c.id === active.id);
    const newIndex = orderedCards.findIndex((c) => c.id === over.id);
    const newOrdering = arrayMove(orderedCards, oldIndex, newIndex);
    setOrderedCards(newOrdering);

    if (user?.uid) {
      const newCardOrder: string[] = newOrdering
        .map((card) => card.id)
        .filter((id): id is string => !!id);
      await updateUserCardOrdering(user.uid, newCardOrder);
    }
  };

  const handleTransferOwnership = async () => {
    const cleanTranferCode = transferCode.trim();
    if (!cleanTranferCode) {
      toast.error("Please enter a transfer code.");
      return;
    }
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      toast.error("You must be logged in to transfer a card.");
      return;
    }
    setLoadTransferCode(true);
    const success = await transferCardOwnershipUsingCode(
      cleanTranferCode,
      currentUser.uid
    );
    setLoadTransferCode(false);
    if (success) {
      setIsDialogOpen(false);
      setTransferCode(""); // Clear the input
      queryClient.invalidateQueries({ queryKey: ["cards", currentUser.uid] });
    } else {
      // Also clear on failure to allow retry with new code
      setTransferCode("");
    }
  };

  if (status === "pending") return <Loading />;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        modifiers={dndModifiers}
        onDragEnd={handleDragEnd}
      >
        <ConfirmDialog />
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen py-4 md:py-8 gap-4">
          <div className="flex items-center justify-end px-4 md:px-16">
            <div className="flex gap-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Add Card
              </Button>
              <Link href="/cards/card-shop">
                <Button variant="green">Buy a Card</Button>
              </Link>
            </div>
          </div>

          <div className="px-4 md:px-14">
            <TooltipProvider>
              {orderedCards.length > 0 ? (
                <SortableCards
                  cards={orderedCards}
                  user={user}
                  confirm={confirm}
                />
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
            </TooltipProvider>
          </div>

          <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <Dialog.Title className="text-lg font-bold">
                    Enter Card Code
                  </Dialog.Title>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={transferCode}
                    onChange={(e) => setTransferCode(e.target.value)}
                    placeholder="Enter transfer code"
                    disabled={loadTransferCode}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    {!loadTransferCode && (
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                          Cancel
                        </button>
                      </Dialog.Close>
                    )}
                    <button
                      className={`$${
                        loadTransferCode && "opacity-75"
                      } bg-green-500 px-4 py-2 text-white rounded flex items-center`}
                      onClick={handleTransferOwnership}
                      disabled={loadTransferCode}
                    >
                      {loadTransferCode ? (
                        <>
                          Transfering &nbsp;
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </DndContext>
    </>
  );
};

export default Cards;
