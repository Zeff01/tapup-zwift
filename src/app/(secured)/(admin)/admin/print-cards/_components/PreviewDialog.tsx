"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { carouselCards } from "@/constants";
import { updateSingleCardPrintStatus } from "@/lib/firebase/actions/card.action";
import { UserState } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { PrintCardsInfo } from "./PrintCardsTable";

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card: PrintCardsInfo | null;
  cardId: string | null;
  user: UserState;
}

const PreviewDialog = ({
  isOpen,
  onClose,
  card,
  cardId,
  user,
}: PreviewDialogProps) => {
  const [printBtnDisable, setPrintBtnDisable] = useState(false);

  const currentCard = Object.values(carouselCards).find(
    (c) => c.title === card?.chosenPhysicalCard?.name
  );

  const handlePrint = async () => {
    setPrintBtnDisable(true);

    try {
      const result = await updateSingleCardPrintStatus({
        role: user?.role!,
        cardId: cardId || "",
      });

      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      console.error("Failed to update print status", error);
    } finally {
      setPrintBtnDisable(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{card?.chosenPhysicalCard?.name}</DialogTitle>
          <DialogDescription>Card ID: {cardId}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          {/* Main Image Preview */}
          <div className="relative w-full h-80 mb-4">
            <Image
              src={
                currentCard?.image ||
                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
              }
              alt={card?.chosenPhysicalCard?.name || "Card image"}
              fill
              className="object-contain rounded-md"
            />
          </div>

          {/* Thumbnail Carousel (optional) */}
          <div className="flex gap-2 overflow-x-auto w-full py-2">
            <button className="relative w-16 h-24 rounded-md overflow-hidden border-2 border-primary">
              <Image
                src={
                  currentCard?.image ||
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                }
                alt={card?.chosenPhysicalCard?.name || "Card image"}
                fill
                className="object-cover"
              />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{card?.chosenPhysicalCard?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span>{currentCard?.price ? `₱${currentCard?.price}` : "N/A"}</span>
          </div>

          <Separator />

          <DialogFooter>
            <Button
              onClick={handlePrint}
              disabled={printBtnDisable}
              className="bg-greenColor text-white hover:bg-greenTitle mt-3 w-full"
            >
              Print Card
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
