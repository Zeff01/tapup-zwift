"use client";

import React from "react";
import NavBar from "./Navbar";
import { useShippingInfo } from "@/providers/shipping-info-provider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  ShippingInfo,
  DeliveryOption,
  Order,
  CreateInvoiceType,
  CustomerType,
} from "@/types/types";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createInvoice } from "@/lib/xendit";
import { getLoggedInUser } from "@/lib/session";
import {
  addCardForUser,
  addInvoice,
  createCustomerAndRecurringPlan,
  getUserById,
  handleCreateInvoice,
} from "@/lib/firebase/actions/user.action";
import { Users } from "@/types/types";
const Checkout = () => {
  const { state: shippingState } = useShippingInfo();
  const { state: cartState } = useCart();
  const { shippingInfo, deliveryOption } = shippingState;
  const { dispatch } = useCart();

  const calculateSubtotal = () => {
    return cartState.items.reduce(
      (total, item) =>
        total +
        item.product.price * item.quantity +
        (item.subscriptionPlan?.price || 0),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = deliveryOption?.shippingFee || 0;
    return subtotal + shippingFee;
  };

  const proceedPayment = async () => {
    try {
      console.log("Starting payment process...");

      const userLoggedIn = await getLoggedInUser();
      console.log("Logged-in user:", userLoggedIn);

      if (typeof userLoggedIn === "string") {
        toast.error("Invalid user session.");
        return;
      }

      const user = (await getUserById(userLoggedIn?.uid)) as Users;
      console.log("Fetched user:", user);

      if (!user) {
        toast.error("User data not found.");
        return;
      }

      const referenceId = `customer-${user.id}-${new Date().toISOString()}`;
      console.log("Generated reference ID:", referenceId);

      const customerData: CustomerType = {
        reference_id: referenceId,
        type: "INDIVIDUAL",
        email: user.email,
        individual_detail: {
          given_names: user.firstName ?? "",
          surname: user.lastName ?? "",
        },
      };

      const cartItem = cartState.items[0];
      console.log("Current cart item:", cartItem);

      if (!cartItem.subscriptionPlan) {
        throw new Error(
          "Subscription plan is required to create a recurring plan."
        );
      }

      console.log(
        "Physical card ID before adding card:",
        cartItem.physicalCardId
      );

      const cardId = await addCardForUser(
        userLoggedIn?.uid,
        cartItem.physicalCardId
      );

      console.log("Newly added card ID:", cardId);

      // Create customer and recurring plan in Xendit
      const { customer, recurringPlan } = await createCustomerAndRecurringPlan(
        customerData,
        cartItem.subscriptionPlan,
        cardId,
        calculateTotal()
      );

      console.log(
        "Customer and Recurring Plan Created:",
        customer,
        recurringPlan
      );
      toast.success("Subscription successfully created.");
      handleClearCart();
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      toast.error("Failed to process subscription.");
    }
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartState");
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
                      unoptimized={true}
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
