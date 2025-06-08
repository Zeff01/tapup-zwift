import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Plus, Minus, Trash2 } from "lucide-react";
import { carouselCards } from "@/constants";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type CardRequest = {
  id: string;
  cardType: string;
  quantity: number;
};

interface GenerateCardsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateCardsDialog = ({ isOpen, onClose }: GenerateCardsDialogProps) => {
  const [cardRequests, setCardRequests] = useState<CardRequest[]>([]);
  const [selectedCardType, setSelectedCardType] = useState<string>("");

  const addCardType = () => {
    if (
      selectedCardType &&
      !cardRequests.find((card) => card.cardType === selectedCardType)
    ) {
      const newCardRequest = {
        // generate a unique ID for the card request
        id: crypto.randomUUID(),
        cardType: selectedCardType,
        quantity: 1,
      };

      setCardRequests([...cardRequests, newCardRequest]);
      setSelectedCardType("");
    }
  };

  const removeCardType = (id: string) => {
    setCardRequests((prev) => prev.filter((card) => card.id !== id));
  };

  const updateCardQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCardRequests((prev) =>
      prev.map((card) => (card.id === id ? { ...card, quantity } : card))
    );
  };

  const incrementQuantity = (id: string) => {
    setCardRequests((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, quantity: card.quantity + 1 } : card
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCardRequests((prev) =>
      prev.map((card) =>
        card.id === id && card.quantity > 1
          ? { ...card, quantity: card.quantity - 1 }
          : card
      )
    );
  };

  const handleCancel = () => {
    setCardRequests([]);
    setSelectedCardType("");
    onClose();
  };

  const totalCards = cardRequests.reduce((sum, req) => sum + req.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-base">
            <CreditCard className="mr-2 size-5" />
            Generate New Cards
          </DialogTitle>
          <DialogDescription>
            Select card types and specify quantities to generate multiple cards
            at once.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <Label className="text-lg font-medium">Add Card Type</Label>
          <div className="flex items-center gap-2 mt-4">
            <Select
              value={selectedCardType}
              onValueChange={setSelectedCardType}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a card type" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                {Object.values(carouselCards).map((card) => (
                  <SelectItem key={card.id} value={card.title}>
                    {card.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={addCardType}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={!selectedCardType}
            >
              <Plus className="mr-1 size-4" />
              Add
            </Button>
          </div>
        </div>

        {cardRequests.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium">Selected Card Types</h2>
              <Badge
                variant={"outline"}
                className="text-blue-700 dark:text-white"
              >
                Total: {cardRequests.length} card
                {cardRequests.length > 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="space-y-3">
              {cardRequests.map((req) => {
                const cardImage = Object.values(carouselCards).filter(
                  (card) => card.title === req.cardType
                )[0].image;

                return (
                  <div
                    key={req.id}
                    className="p-4 flex items-center justify-between border rounded-lg border-input"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          cardImage ||
                          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                        }
                        alt={`${req.cardType} image`}
                        width={55}
                        height={39}
                        className="rounded-sm object-cover"
                      />
                      <span className="text-base font-semibold text-black dark:text-gray-300">
                        {req.cardType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => decrementQuantity(req.id)}
                          disabled={req.quantity <= 1}
                        >
                          <Minus className="size-3" />
                        </Button>
                        <Input
                          type="number"
                          value={req.quantity}
                          onChange={(e) =>
                            updateCardQuantity(
                              req.id,
                              Number.parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 text-center"
                          min={1}
                        />
                        <Button
                          onClick={() => incrementQuantity(req.id)}
                          variant="outline"
                          size="icon"
                          className="size-8"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size={"icon"}
                        onClick={() => removeCardType(req.id)}
                        className="size-8 hover:bg-transparent text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="size-3 " />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {cardRequests.length > 0 && (
          <div className="p-4 mt-6">
            <div className="text-sm text-blue-800 dark:text-gray-200">
              <strong>Generation Summary:</strong>
            </div>
            <div className="text-sm text-blue-700 dark:text-muted-foreground mt-1">
              {cardRequests.map((req, index) => (
                <div key={req.id}>
                  • {req.quantity} × {req.cardType}
                  {index < cardRequests.length - 1 && <br />}
                </div>
              ))}
            </div>
            <div className="text-sm text-blue-800 dark:text-gray-300 mt-1 font-semibold">
              Total cards to generate: {totalCards}
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between mt-6">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button
            disabled={cardRequests.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Generate {totalCards} Cards
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateCardsDialog;
