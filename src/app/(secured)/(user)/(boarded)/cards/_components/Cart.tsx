import React, { useEffect } from "react";
import { useCart } from "@/providers/cart-provider";
import { CartItem } from "@/types/types";
import ProductCard from "./ProductCard";

interface CartProps {
  showTrash: boolean;
}

const Cart: React.FC<CartProps> = ({ showTrash }) => {
  const { state } = useCart();

  return (
    <div>
      {state.items.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        state.items.map((item: CartItem) => (
          <ProductCard
            key={item.product.id}
            item={item}
            showTrash={showTrash}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
