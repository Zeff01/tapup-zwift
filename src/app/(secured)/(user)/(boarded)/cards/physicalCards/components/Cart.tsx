import React from "react";
import CardItem from "./CardItem";
const Cart = () => {
  return (
    <div className="w-full space-y-2 border">
      <CardItem
        imageSrc="/assets/card1-front.png"
        title="Purple Glow"
        price={1000}
      />
    </div>
  );
};

export default Cart;
