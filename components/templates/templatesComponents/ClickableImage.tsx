"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";

interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick: () => void;
  showExpandIcon?: boolean;
}

export const ClickableImage: React.FC<ClickableImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  onClick,
  showExpandIcon = true,
}) => {
  return (
    <div 
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity group-hover:opacity-90", className)}
      />
      {showExpandIcon && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
            <Expand className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};