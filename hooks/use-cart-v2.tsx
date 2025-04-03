import { useCart as useCartContext } from "@/providers/cart-provider-v2";
export const useCart = () => {
  return useCartContext();
};
