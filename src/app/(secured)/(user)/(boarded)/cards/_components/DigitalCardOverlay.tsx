"use client";

import {
  GripVertical,
  EyeIcon,
  Edit2,
  CheckCircle2,
  ArrowRightLeft,
  QrCode,
} from "lucide-react";
import { Card } from "@/types/types";
import { getCardImage } from "@/lib/utils";

/**
 * Skeleton version of the DigitalCard component with static buttons for layout.
 */
type Prop = {
  card: Partial<Card>;
};

const isCardExpired = (expiryDate?: number) => {
  if (!expiryDate) return true;
  return expiryDate < Date.now();
};

const DigitalCardOverlay = ({ card }: Prop) => {
  const cardImage = getCardImage(card.chosenPhysicalCard?.id);
  const isCardDisabled = card.disabled ?? false;

  const iconButtons = [
    { icon: EyeIcon, tooltip: "Preview" },
    { icon: Edit2, tooltip: "Edit" },
    { icon: CheckCircle2, tooltip: "Enable/Disable" },
    { icon: ArrowRightLeft, tooltip: "Transfer" },
    { icon: QrCode, tooltip: "Share" },
  ];

  return (
    <div data-id={card.id} className="w-full relative cursor-grab">
      <div className="w-full flex gap-2.5">
        <div className="flex flex-col justify-center items-center space-y-1">
          {iconButtons.map((btn, idx) => (
            <span
              key={idx}
              className="px-2 py-2 border border-gray-300 rounded-md opacity-50 bg-white"
            >
              <btn.icon className="size-4 drop-shadow-md" />
            </span>
          ))}
        </div>

        <div
          className={`flex-1 w-full aspect-[340/208] transition-transform duration-200 flex justify-between text-secondary bg-transparent rounded-xl overflow-hidden relative [background-size:contain] md:[background_size:cover]
          ${isCardExpired(card.expiryDate) || isCardDisabled ? "opacity-50" : ""}
          `}
          style={{
            backgroundImage: cardImage ? `url(${cardImage})` : "none",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {(isCardExpired(card.expiryDate) || isCardDisabled) && (
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
              {isCardDisabled ? "Disabled" : "Expired"}
            </div>
          )}

          <div className="absolute w-full top-1/2 right-0 -translate-y-1/2 flex items-center justify-end z-30">
            <GripVertical
              className="z-30 mr-2 md:mr-3.5 peer size-6 sm:size-12 lg:size-8 text-white opacity-80 hover:opacity-100 transition-opacity duration-150 bg-black/20 rounded-md p-1"
              style={{ touchAction: "none" }}
            />
          </div>

          <div className="flex-1 py-3 px-4 relative">
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[clamp(1rem,1.4vw,1.1rem)] mt-3 sm:mt-0 font-semibold capitalize text-white">
                  {(card.firstName || "") + " " + (card.lastName || "")}
                </p>
                <p className="text-xs capitalize text-white">
                  {card.position || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCardOverlay;
