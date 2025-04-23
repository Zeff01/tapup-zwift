"use client";

import React, { useState } from "react";
import DigitalCard from "@/components/DigitalCard";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";
import { useQuery } from "@tanstack/react-query";
import {
  getCardsByOwner,
  transferCardOwnershipUsingCode,
} from "@/lib/firebase/actions/card.action";
import Loading from "@/src/app/loading";
import { useConfirm } from "@/hooks/useConfirm";
import { QrCode, ShoppingBag } from "lucide-react";
import QrCodeModal from "@/components/qrcode/qrcode-modal";
import * as Dialog from "@radix-ui/react-dialog";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

const Cards = () => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferCode, setTransferCode] = useState("");

  const { data: cards, status } = useQuery({
    queryKey: ["cards", user?.uid],
    queryFn: () => getCardsByOwner(user?.uid!),
    staleTime: 1000 * 60 * 5,
  });

  const handleAddCard = () => {
    setIsDialogOpen(true);
  };

  const handleTransferOwnership = async () => {
    if (!transferCode.trim()) {
      toast.error("Please enter a transfer code.");
      return;
    }

    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      toast.error("You must be logged in to transfer a card.");
      return;
    }

    const success = await transferCardOwnershipUsingCode(
      transferCode,
      currentUser.uid
    );

    if (success) {
      setIsDialogOpen(false);
      setTransferCode("");
      queryClient.invalidateQueries({ queryKey: ["cards", currentUser.uid] });
    }
  };

  if (status === "pending") return <Loading />;

  return (
    <>
      <ConfirmDialog />
      <div className="px-4 flex flex-col min-h-full md:px-16 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-semibold">MY CARDS</h1>

          <div className="flex gap-x-2">
            <button
              onClick={handleAddCard}
              className="text-green-500 border border-green-500 rounded-lg md:text-lg px-6 py-2"
            >
              Add Card
            </button>
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

        <TooltipProvider>
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
        </TooltipProvider>
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
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleTransferOwnership}
                  >
                    Add
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
