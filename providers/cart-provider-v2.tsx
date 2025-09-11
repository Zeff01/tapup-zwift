"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useUserContext } from "./user-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCartByUserUid,
  saveCartItemsByUserUid,
} from "@/lib/firebase/actions/cart.action";
import { SubscriptionPlan } from "@/types/types";
import { toast } from "react-toastify";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subscriptionPlan?: SubscriptionPlan;
};

type CartContextType = {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const { isAuthenticated, user } = useUserContext();
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["userUid", user?.uid],
    queryFn: () => getCartByUserUid(user?.uid),
    enabled: isAuthenticated && !!user?.uid,
  });

  useEffect(() => {
    if (isAuthenticated && cartData) {
      setItems(cartData.cartItems);
    } else if (!isAuthenticated && typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      setItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [isAuthenticated, cartData]);

  useEffect(() => {
    // Clear localStorage after login
    if (isAuthenticated && user?.uid && typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, [isAuthenticated, user?.uid]);

  const { mutate: saveCart } = useMutation({
    mutationFn: ({ userUid, items }: { userUid: string; items: CartItem[] }) =>
      saveCartItemsByUserUid(userUid, items),
  });

  const saveTimeout = useRef<NodeJS.Timeout>(); // Add delay (debouncer)
  const isInitialMount = useRef(true); // To prevent saving empty cart to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only save if we have items and user is authenticated
    if (isAuthenticated && user?.uid && items.length > 0) {
      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        saveCart({ userUid: user.uid, items });
      }, 500); // 0.5s delay
    } else if (!isAuthenticated && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  useEffect(() => {
    // Clean up
    return () => clearTimeout(saveTimeout.current);
  }, []);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
    // openCart();
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
