import React, { useEffect } from "react";
import { useCart } from "@/providers/cart-provider";
import ProductCard from "./ProductCard";

interface CartProps {
  showTrash: boolean;
}

const Cart: React.FC<CartProps> = ({ showTrash }) => {
  const { items } = useCart();

  return (
    <div>
      {items.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        items.map((item) => (
          <ProductCard
            key={item.id}
            item={{
              physicalCardId: item.id,
              product: {
                id: item.id,
                title: item.name,
                image: item.image,
                price: item.price,
                description: item.description || "Premium digital business card",
              },
              quantity: item.quantity,
              subscriptionPlan: item.subscriptionPlan || null,
            }}
            showTrash={showTrash}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
