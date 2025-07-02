"use client";

import { useEffect, useState } from "react";
import Cards from "./cards";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ClientCardWrapper() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      console.log("isMObile")
    }
  }, [isMobile]);

  return (
    <div className={`flex-1 `}>
      <Cards />
    </div>
  );
}
