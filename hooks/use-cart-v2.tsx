import { useCart as useCartContext } from "@/providers/cart-provider-v3";
export const useCart = () => {
  return useCartContext();
};
