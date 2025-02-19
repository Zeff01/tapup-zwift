"use client";

import React, { useEffect } from "react";
import NavBar from "./Navbar";
import { useShippingInfo } from "@/providers/shipping-info-provider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { ShippingInfo, DeliveryOption, Order } from "@/types/types";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
const Checkout = () => {
  const { state: shippingState } = useShippingInfo();
  const { state: cartState } = useCart();
  const { shippingInfo, deliveryOption } = shippingState;

  const calculateSubtotal = () => {
    return cartState.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = deliveryOption ? deliveryOption.shippingFee : 0;
    return subtotal + shippingFee;
  };

  const proceedPayment = () => {
    const order: Order = {
      items: cartState.items,
      shippingInfo: shippingInfo as ShippingInfo,
      deliveryOption: deliveryOption as DeliveryOption,
      orderDate: new Date(),
      totalAmount: calculateTotal(),
      status: "Pending",
      orderId: "",
    };
    toast.error("Payment Gateway not yet implemented");
  };
  return (
    <div className="relative max-h-screen flex flex-col max-w-sm w-full overflow-auto">
      {/* Navigation Bar */}
      <NavBar title="Checkout" href="/cards/cardShop" />
      <div className="space-y-3 mx-4 mb-4 flex-1">
        <div>
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Contact
          </h3>

          <Link href="/cards/shippingAddress">
            <div className="flex justify-between items-center rounded-lg hover:bg-inputOnChangeBg p-3 border">
              <div>
                <h3>
                  {!shippingState.shippingInfo ||
                  !shippingState.shippingInfo.recipientName ? (
                    "Add Address"
                  ) : (
                    <p>
                      {shippingInfo?.recipientName} |{" "}
                      <span className="text-muted-foreground">
                        {shippingInfo?.contactNumber},{" "}
                        {shippingInfo?.address.city}
                        {shippingInfo?.address.street}{" "}
                        {shippingInfo?.address.unit}{" "}
                        {shippingInfo?.address.postalCode}
                      </span>
                    </p>
                  )}
                </h3>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </div>
        <div>
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Delivery Option
          </h3>

          <Link href="/cards/deliveryOption">
            <div className="border rounded-md flex justify-between items-center w-full p-3 hover:bg-inputOnChangeBg ">
              {shippingState.deliveryOption ? (
                <div className=" flex items-center gap-3">
                  {/* Image */}
                  <Image
                    src={deliveryOption?.image || ""}
                    alt={deliveryOption?.name || "img"}
                    width={44}
                    height={22}
                  />

                  {/* details */}
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <h1>{deliveryOption?.name}</h1>
                      <p className="text-muted-foreground">
                        ₱ {deliveryOption?.shippingFee}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Est. Delivery Date: {deliveryOption?.minDays} -{" "}
                      {deliveryOption?.maxDays} days
                    </div>
                  </div>
                </div>
              ) : (
                <p>Add Courier</p>
              )}
              <ChevronRight />
            </div>
          </Link>
        </div>

        {/*order summary  */}
        <div>
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Order Summary
          </h3>
          <div className="border rounded-md p-3">
            <div className="space-y-2 max-h-60 overflow-auto">
              {cartState.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full items-center"
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div>
                      <h1>{item.product.title}</h1>
                      <p className="text-muted-foreground">
                        ₱ {item.product.price}
                      </p>
                    </div>
                  </div>
                  <h3>X {item.quantity}</h3>
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
      </div>
      {/* Fixed Bottom Section */}
      <div className="p-4 border rounded-t-3xl ">
        <div className="flex justify-between items-center">
          <p className="space-x-2">
            Total: <span className="text-greenTitle">₱{calculateTotal()}</span>
          </p>
          {/* change to /cards/orderStatus/success , if xendit is successfull */}
          <Link href="/cards/checkout">
            <Button variant="green" onClick={proceedPayment}>
              Proceed To Payment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
