"use client";

import { useEffect, useState } from "react";
import Cards from "./cards";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ClientCardWrapper() {
  const [dragActive, setDragActive] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = dragActive ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [dragActive, isMobile]);

  return (
    <div className={`flex-1 ${dragActive && isMobile ? "overflow-hidden touch-none" : ""}`}>
      <Cards setDragActive={setDragActive} />
    </div>
  );
}
