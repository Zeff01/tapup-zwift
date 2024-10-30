"use client";

import { LOCAL_STORAGE_NAME } from "@/constants";
import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [hasItemValue, setHasItemValue] = useState<boolean | null>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasItemValue(
        window.localStorage.getItem(LOCAL_STORAGE_NAME) === "true"
      );
    }
  });

  const hasItem = () => {
    return hasItemValue;
  };

  return {
    hasItem,
  };
};

export default useLocalStorage;
