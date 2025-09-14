"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    // Handle arrow keys
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleArrowKeys);
    
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [onClose]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Hook to use the image viewer
export const useImageViewer = () => {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    images: string[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
  });

  const openViewer = (images: string[], initialIndex = 0) => {
    setViewerState({
      isOpen: true,
      images,
      initialIndex,
    });
  };

  const closeViewer = () => {
    setViewerState({
      isOpen: false,
      images: [],
      initialIndex: 0,
    });
  };

  return {
    viewerState,
    openViewer,
    closeViewer,
  };
};