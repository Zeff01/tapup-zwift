"use client";

import React from "react";
import { useShippingInfo } from "@/providers/shipping-info-provider";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import PendingClock from "@/public/assets/pending-clock.png";

const OrderStatusSuccess = () => {
  const { state: shippingState } = useShippingInfo();
  const { items } = useCart();
  const { deliveryOption } = shippingState;

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = deliveryOption ? deliveryOption.shippingFee : 0;
    return subtotal + shippingFee;
  };

  return (
    <div className=" flex flex-col max-w-sm w-full overflow-auto my-2 ">
      <div className="w-full border gap-3 rounded-md p-4 flex flex-col justify-center items-center">
        <Image src={PendingClock} alt="Pending Clock" width={50} height={50} />
        <h1 className="text-2xl font-bold">Your order is pending</h1>
        <p className="text-muted-foreground text-center">
          To proceed with the delivery, you must first fill out the information
          needed for the cards.
        </p>
      </div>
      <div className="flex justify-between w-full gap-3 my-2">
        <Button variant={"secondary"} className=" flex-1">
          {" "}
          View Orders Details
        </Button>
        <Button variant={"green"} className=" flex-1">
          {" "}
          Fill Out Info
        </Button>
      </div>
      {/*order summary  */}
      <div>
        <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
          Order Summary
        </h3>
        <div className="border rounded-md p-3">
          <div className="space-y-4 max-h-60 overflow-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between w-full items-center "
              >
                <div className="flex gap-3 items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <h3>{item.quantity}</h3>
                  <h3>X</h3>
                  <p className="text-muted-foreground">
                    ₱ {item.price}
                  </p>
                </div>
              </div>
            ))}
            <p>
              Shipping Fee <br />{" "}
              <span className="text-muted-foreground">
                ₱ {deliveryOption?.shippingFee}
              </span>
            </p>
          </div>
        </div>
      </div>

      <Link href="/cards/shippingAddress">
        <div className="flex justify-between items-center rounded-md my-4 bg-inputOnChangeBg p-3 border">
          <p>Total (VAT included):</p>
          <p className="text-greenColor"> ₱ {calculateTotal()}</p>
        </div>
      </Link>
    </div>
  );
};
export default OrderStatusSuccess;
