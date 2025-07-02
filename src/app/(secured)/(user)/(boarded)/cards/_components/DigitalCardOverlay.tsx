"use client";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, EyeIcon, Edit2, CheckCircle2, ArrowRightLeft, QrCode } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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
  const [hovered, setHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id as UniqueIdentifier });

  const cardImage = getCardImage(card.chosenPhysicalCard?.id);
  const isCardDisabled = card.disabled ?? false;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const iconButtons = [
    { icon: EyeIcon, tooltip: "Preview" },
    { icon: Edit2, tooltip: "Edit" },
    { icon: CheckCircle2, tooltip: "Enable/Disable" },
    { icon: ArrowRightLeft, tooltip: "Transfer" },
    { icon: QrCode, tooltip: "Share" },
  ];

  return (
    <div
      data-id={card.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full relative"
    >
      <div className="w-full flex gap-2.5">
        <div className="flex flex-col justify-center items-center space-y-1">
          {iconButtons.map((btn, idx) => (
            <span
              key={idx}
              className="px-2 py-2 border border-gray-300 rounded-md opacity-50 cursor-default bg-white"
            >
              <btn.icon className="size-4 drop-shadow-md" />
            </span>
          ))}
        </div>

        <div
          className={`flex-1 w-full aspect-[340/208] transition-transform duration-200 flex justify-between text-secondary bg-transparent rounded-xl overflow-hidden relative [background-size:contain] md:[background_size:cover]}`}
          style={{
            backgroundImage: cardImage ? `url(${cardImage})` : "none",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }} onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <div className="absolute bottom-5 right-5 bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg">
              Card Overlay
            </div>
          )}

          <div className="absolute w-full top-1/2 right-0 -translate-y-1/2 flex items-center justify-end z-30">
            <GripVertical
              {...listeners}
              className="z-30 mr-3 size-6 cursor-grab text-white opacity-80 hover:opacity-100 bg-black/20 rounded-md p-1"
              style={{ touchAction: 'none' }}
            />
          </div>

          <Link
            href="#"
            prefetch
            className="flex-1 py-3 px-4 border-r border-accent/40 relative cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[clamp(1rem,1.4vw,1.1rem)] mt-3 sm:mt-0 font-semibold capitalize text-white">
                  {card.firstName || "First"} {card.lastName || "Last"}
                </p>
                <p className="text-xs capitalize text-white">
                  {card.position || "Position"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DigitalCardOverlay;
