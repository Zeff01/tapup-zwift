import React from "react";
import CardItem from "./CardItem";
const Cart = () => {
  return (
    <div className="w-full space-y-2 ">
      <div className="flex">
        <CardItem
          imageSrc="/images/purple-glow.png"
          title="Purple Glow"
          price={1000}
        />
      </div>
    </div>
  );
};

export default Cart;
