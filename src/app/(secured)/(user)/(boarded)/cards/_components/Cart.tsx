import React, { useEffect } from "react";
import { useCart } from "@/providers/cart-provider";
import { CartItem } from "@/types/types";
import ProductCard from "./ProductCard";

const Cart: React.FC = () => {
  const { state } = useCart();

  return (
    <div>
      {state.items.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        state.items.map((item: CartItem) => (
          <ProductCard key={item.product.id} item={item} />
        ))
      )}
    </div>
  );
};

export default Cart;
