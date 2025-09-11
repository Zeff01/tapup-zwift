"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlippableCardProps {
  frontImage: string;
  backImage: string;
  title: string;
  isSelected?: boolean;
  autoFlip?: boolean;
  className?: string;
}

export function FlippableCard({
  frontImage,
  backImage,
  title,
  isSelected = false,
  autoFlip = false,
  className,
}: FlippableCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isFlipped = autoFlip || isHovered;

  return (
    <div 
      className={cn("relative w-full h-full", className)}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full rounded-2xl overflow-hidden",
            isSelected ? "shadow-2xl ring-4 ring-green-400/20" : ""
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={frontImage}
            alt={`${title} Front`}
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full rounded-2xl overflow-hidden",
            isSelected ? "shadow-2xl ring-4 ring-green-400/20" : ""
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={backImage}
            alt={`${title} Back`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}