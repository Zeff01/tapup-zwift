"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ShippingInfo, DeliveryOption } from "@/types/types";

export interface ShippingState {
  shippingInfo: ShippingInfo | null;
  deliveryOption: DeliveryOption | null;
}

const initialState: ShippingState = {
  shippingInfo: {
    recipientName: "",
    contactNumber: "",
    address: {
      city: "",
      street: "",
      unit: "",
      postalCode: "",
    },
  },
  deliveryOption: {
    name: "",
    image: "",
    shippingFee: 0,
    minDays: 0,
    maxDays: 0,
  },
};

// Create context
export const ShippingInfoContext = createContext<
  | {
      state: ShippingState;
      setState: React.Dispatch<React.SetStateAction<ShippingState>>;
    }
  | undefined
>(undefined);

// Provider component
export const ShippingInfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ShippingState>(() => {
    const persistedState = localStorage.getItem("shippingInfoState");
    return persistedState ? JSON.parse(persistedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("shippingInfoState", JSON.stringify(state));
  }, [state]);

  return (
    <ShippingInfoContext.Provider value={{ state, setState }}>
      {children}
    </ShippingInfoContext.Provider>
  );
};

export const useShippingInfo = () => {
  const context = useContext(ShippingInfoContext);
  if (context === undefined) {
    throw new Error(
      "useShippingInfo must be used within a ShippingInfoProvider"
    );
  }
  return context;
};
