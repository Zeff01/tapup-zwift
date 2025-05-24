"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardItem } from "@/types/types";
import { updateSingleCardPrintStatus } from "@/lib/firebase/actions/card.action";
import { useState } from "react";
import { useUserContext } from "@/providers/user-provider";
import { toast } from "react-toastify";
import Image from "next/image";

interface PreviewDialogProps {
  selectedCard: string;
  setSelectedCard: (value: string | null) => void;
  card?: CardItem;
  cardId: string | null;
}

const PreviewDialog = ({
  selectedCard,
  setSelectedCard,
  card,
  cardId,
}: PreviewDialogProps) => {
  const [printBtnDisable, setPrintBtnDisable] = useState(false);
  const { user } = useUserContext();

  const handlePrint = async () => {
    setPrintBtnDisable(true);

    try {
      const result = await updateSingleCardPrintStatus({
        role: user?.role!,
        cardId: cardId || "",
      });

      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
      setSelectedCard(null);
    } catch (error) {
      console.error("Failed to update print status", error);
    } finally {
      setPrintBtnDisable(false);
    }
  };

  return (
    <Dialog
      open={!!selectedCard}
      onOpenChange={(open) => !open && setSelectedCard(null)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{card?.title}</DialogTitle>
          <DialogDescription>Card ID: {cardId}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          {/* Main Image Preview */}
          <div className="relative w-full h-80 mb-4">
            <Image
              src={
                card?.image ||
                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
              }
              alt={card?.title || "Card image"}
              fill
              className="object-contain rounded-md"
            />
          </div>

          {/* Thumbnail Carousel (optional) */}
          <div className="flex gap-2 overflow-x-auto w-full py-2">
            <button className="relative w-16 h-24 rounded-md overflow-hidden border-2 border-primary">
              <Image
                src={
                  card?.image ||
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                }
                alt={card?.title || "Card image"}
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
            <span>{card?.title}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span>{card?.price ? `₱${card?.price}` : "N/A"}</span>
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
