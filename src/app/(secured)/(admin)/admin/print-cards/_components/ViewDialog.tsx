import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PrintCardsInfo } from "./PrintCardsTable";
import { carouselCards } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card: PrintCardsInfo | null;
  cardId: string | null;
}

const ViewDialog = ({ isOpen, onClose, card, cardId }: ViewDialogProps) => {
  const currentCard = Object.values(carouselCards).find(
    (c) => c.title === card?.chosenPhysicalCard?.name
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{card?.chosenPhysicalCard?.name}</DialogTitle>
          <DialogDescription>Card ID: {cardId}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="relative w-full h-80 mb-4">
            <Image
              src={
                currentCard?.image ||
                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
              }
              alt={currentCard?.title || "Card image"}
              fill
              className="object-contain rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-500 dark:text-gray-300/70">
                Card Name
              </h3>
              <p className="text-sm">{card?.chosenPhysicalCard?.name}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-500 dark:text-gray-300/70">
                Transfer Code
              </h3>
              <p className="text-sm">{card?.transferCode}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-500 dark:text-gray-300/70">
                Subscription ID
              </h3>
              <p className="text-sm">
                {card?.subscription_id ? card?.subscription_id : "N/A"}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-500 dark:text-gray-300/70">
                Price
              </h3>
              <p className="text-sm">₱{currentCard?.price}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
