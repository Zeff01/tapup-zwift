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
// import { QrCode, ShoppingBag } from "lucide-react";
// import { ShoppingBag } from "lucide-react";

// import QrCodeModal from "@/components/qrcode/qrcode-modal";
import * as Dialog from "@radix-ui/react-dialog";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

const Cards = () => {
  // const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this card"
  );
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferCode, setTransferCode] = useState("");
  const [loadTransferCode, setLoadTransferCode] = useState(false);
  let ctxTimeout: any = null;

  const { data: cards, status } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["cards", user?.uid],
    queryFn: () => getCardsByOwner(user?.uid!),
    staleTime: 1000 * 60 * 5,
  });

  const handleAddCard = () => {
    setIsDialogOpen(true);
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

    if (ctxTimeout) {
      clearTimeout(ctxTimeout);
    }

    ctxTimeout = setTimeout(()=> {
      setLoadTransferCode(false);
    }, 1500);
  };

  if (status === "pending") return <Loading />;

  return (
    <>
      <ConfirmDialog />
      <div className="px-4 flex flex-col min-h-full md:px-16 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">My Cards</h1>

          <div className="flex gap-x-2">
            <Button variant={"outline"} onClick={handleAddCard}>
              Add Card
            </Button>
            <Link href={"/cards/card-shop"}>
              <Button variant={"green"}>Buy a Card</Button>
            </Link>
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
                  disabled={loadTransferCode}
                />
                <div className="flex justify-end gap-2 mt-4">
                 {!loadTransferCode && <Dialog.Close asChild>
                    <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                      Cancel
                    </button>
                  </Dialog.Close> }
                  <button
                    className={`${loadTransferCode && 'opacity-75'} bg-green-500 px-4 py-2 text-white rounded flex items-center`}
                    onClick={handleTransferOwnership}
                    disabled={loadTransferCode}
                  >
                    {loadTransferCode ? 
                      <>
                        Transfering &nbsp;
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                      : "Add"
                    }
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
