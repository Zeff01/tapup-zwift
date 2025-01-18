"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

import { CartItem } from "@/types/types";

export interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | {
      type: "UPDATE_CART_ITEM_QUANTITY";
      payload: { id: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
};

export const CartProviderContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.id
        ),
      };
    case "UPDATE_CART_ITEM_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const persistedState = localStorage.getItem("cartState");
    return persistedState ? JSON.parse(persistedState) : initial;
  });

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);
  return (
    <CartProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </CartProviderContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartProviderContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
