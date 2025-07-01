"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
//import { SortableCard } from "./SortableCard";
import DigitalCard from "@/components/DigitalCard";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  getCardsByOwner,
  transferCardOwnershipUsingCode,
} from "@/lib/firebase/actions/card.action";
import {
  updateUserCardOrdering,
  getUserCardOrdering,
} from "@/lib/firebase/actions/user.action";
import Loading from "@/src/app/loading";
import { useConfirm } from "@/hooks/useConfirm";
import * as Dialog from "@radix-ui/react-dialog";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/types/types";
import {
  useDndContext,
  useDndMonitor,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

const CardGrid = ({
  cards,
  user,
  confirm,
  setDragActive,
}: {
  cards: Card[];
  user: any;
  confirm: any;
  setDragActive: (dragging: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const { active } = useDndContext();

  useEffect(() => {
    setDragActive(Boolean(active));
  }, [active, setDragActive]);

  // Manual auto-scroll when dragging near screen edges
  const scrollRef = useRef<{
    frame: number | null;
    direction: "up" | "down" | null;
  }>({ frame: null, direction: null });

  const lastYRef = useRef<number | null>(null);

  const cancelScroll = () => {
    if (scrollRef.current.frame) {
      cancelAnimationFrame(scrollRef.current.frame);
      scrollRef.current.frame = null;
    }
    scrollRef.current.direction = null;
    lastYRef.current = null;
  };

  useDndMonitor({
    onDragMove(event) {
      const node = document.querySelector(`[data-id="${event.active.id}"]`) as HTMLElement | null;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const windowHeight = window.innerHeight;

      const threshold = 120;
      const maxSpeed = 60;
      const minSpeed = 20;
      const topEdge = threshold;
      const bottomEdge = windowHeight - threshold;

      // Determine movement direction
      const lastY = lastYRef.current;
      let direction: "up" | "down" | null = null;
      if (lastY !== null) {
        const deltaY = centerY - lastY;
        if (Math.abs(deltaY) > 1) {
          direction = deltaY > 0 ? "down" : "up";
        }
      }
      lastYRef.current = centerY;
      if (!direction) return;

      let distance = 0;
      if (direction === "down" && rect.bottom > bottomEdge) {
        distance = Math.min(rect.bottom - bottomEdge, threshold);
      } else if (direction === "up" && rect.top < topEdge) {
        distance = Math.min(topEdge - rect.top, threshold);
      } else {
        cancelScroll(); // Stop if not near edge
        return;
      }

      const ratio = distance / threshold;
      const eased = ratio * ratio; // quadratic ease
      const amount = minSpeed + (maxSpeed - minSpeed) * eased;

      // If direction changed, cancel existing scroll
      if (scrollRef.current.direction !== direction && scrollRef.current.frame) {
        cancelAnimationFrame(scrollRef.current.frame);
        scrollRef.current.frame = null;
      }

      scrollRef.current.direction = direction;

      if (scrollRef.current.frame) return;

      const scrollLoop = () => {
        const currentY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (
          (direction === "down" && currentY >= maxScroll) ||
          (direction === "up" && currentY <= 0)
        ) {
          cancelScroll();
          return;
        }

        window.scrollBy({ top: direction === "down" ? amount : -amount });
        scrollRef.current.frame = requestAnimationFrame(scrollLoop);
      };

      scrollRef.current.frame = requestAnimationFrame(scrollLoop);
    },

    onDragEnd: cancelScroll,
    onDragCancel: cancelScroll,
  });



  return (
    <SortableContext
      items={cards.map((c) => c.id as string)}
      strategy={isMobile ? verticalListSortingStrategy : rectSortingStrategy}
    >
      <div
        className="
          grid justify-center justify-items-center
          grid-cols-[repeat(auto-fill,minmax(17rem,24rem))]
          xl:justify-start xl:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
          gap-4 md:px-2
        "
      >
        {cards.map((card) => (
          <DigitalCard
            key={card.id}
            user={user}
            confirm={confirm}
            card={card}
          />
        ))}
      </div>
    </SortableContext>
  );
};

const Cards = ({ setDragActive }: {
  setDragActive: (value: boolean) => void;
}) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferCode, setTransferCode] = useState("");
  const [loadTransferCode, setLoadTransferCode] = useState(false);
  const [orderedCards, setOrderedCards] = useState<Card[]>([]);
  let ctxTimeout: any = null;

  // Sort cards based on the cardOrdering field from the user-account document
  const sortCards = async (
    cards: Partial<Card>[],
    uid: string
  ): Promise<Card[]> => {
    const ordering = await getUserCardOrdering(uid);

    if (!ordering) {
      return cards.filter((c): c is Card => !!c.id && !!c.owner); // return in original order (typed safely)
    }

    const cardMap = new Map(cards.map((card) => [card.id, card]));
    const sorted = ordering
      .map((id) => cardMap.get(id))
      .filter((card): card is Card => !!card?.id && !!card?.owner);

    const unordered = cards.filter(
      (c): c is Card => !!c.id && !!c.owner && !ordering.includes(c.id)
    );

    return [...sorted, ...unordered];
  };

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

  const isMobile = useIsMobile(); // your custom hook

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
    if (success) {
      setIsDialogOpen(false);
      setTransferCode("");
      queryClient.invalidateQueries({ queryKey: ["cards", currentUser.uid] });
    }
    if (ctxTimeout) clearTimeout(ctxTimeout);
    ctxTimeout = setTimeout(() => setLoadTransferCode(false), 1500);
  };

  if (status === "pending") return <Loading />;

  return (
    <>
      <ConfirmDialog />
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen py-4 md:py-8 gap-4">
        <div className="flex items-center justify-between px-4 md:px-16">
          <h1 className="text-xl md:text-2xl font-semibold">My Cards</h1>
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              modifiers={dndModifiers}
              onDragEnd={handleDragEnd}
            >
              {orderedCards.length > 0 ? (
                <CardGrid cards={orderedCards} user={user} confirm={confirm} setDragActive={setDragActive} />
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
            </DndContext>
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
                    className={`$${loadTransferCode && "opacity-75"
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
    </>
  );
};

export default Cards;
