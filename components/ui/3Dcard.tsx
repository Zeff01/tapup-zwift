"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate more nuanced rotation
    const x = ((e.clientX - left - width / 2) / width) * 20; // Reduced intensity
    const y = ((e.clientY - top - height / 2) / height) * 20; // Reduced intensity

    // More complex transformation
    containerRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x}deg) 
      rotateX(${-y}deg) 
      translateZ(50px) 
      scale(1.03)
    `;

    // Add shadow effect
    containerRef.current.style.boxShadow = `
      ${-x}px ${y}px 30px rgba(0,0,0,0.2)
    `;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (containerRef.current) {
      containerRef.current.style.transition =
        "transform 0.3s ease-out, box-shadow 0.3s ease-out";
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!containerRef.current) return;

    containerRef.current.style.transform = `
      perspective(1000px) 
      rotateY(0deg) 
      rotateX(0deg) 
      translateZ(0px) 
      scale(1)
    `;
    containerRef.current.style.boxShadow = "none";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative transition-all duration-300 ease-out",
        "rounded-lg overflow-hidden",
        "will-change-transform", // Performance optimization
        containerClassName
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: "translateZ(-50px)", // Initial depth
      }}
    >
      {/* Hover overlay for additional depth */}
      {isHovering && (
        <div
          className="absolute inset-0  pointer-events-none z-10"
          style={{
            transform: "translateZ(80px)",
          }}
        />
      )}

      {children}
    </div>
  );
};
