import { useCart as useCartContext } from "@/providers/cart-provider";
export const useCart = () => {
  return useCartContext();
};
