"use client";

import { OrderCardsCarousel } from "@/components/OrderCardsCarousel";
import { cardItems } from "@/constants";
import { createPortfolioSchema } from "@/lib/zod-schema";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Trash,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import Cart from "./Cart";
import ComingSoon from "@/components/ComingSoon";
import Image from "next/image";
import NavBar from "./Navbar";
import { useCart } from "@/providers/cart-provider";
import { CartItem, SubscriptionPlan } from "@/types/types";
import Link from "next/link";
import { getSubscriptionPlans } from "@/lib/firebase/actions/user.action";
export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

const OrderPhysicalCard = () => {
  const { state, dispatch } = useCart();

  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getSubscriptionPlans();
      setSubscriptionPlans(plans);

      if (plans.length > 0) {
        setSelectedPlan(plans[0]); // Set first plan as default
      }
    };

    fetchPlans();
  }, []);

  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const plan = subscriptionPlans.find((p) => p.id === event.target.value);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = state.items.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity +
      (item.subscriptionPlan?.price || 0),
    0
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const handleButtonTrash = () => {
    setIsTrash(!isTrash);
  };

  const [selectedPhysicalCard, setSelectedPhysicalCard] =
    useState<ChosenPhysicalCardType>("card1");

  const toggleExpand = () => {
    +setIsExpanded(!isExpanded);
  };

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const selectedCard = cardItems.find(
    (card) => card.id === selectedPhysicalCard
  );

  const addItemToCart = () => {
    console.log("Attempting to add item to cart...");
    console.log("Selected Card:", selectedCard);
    console.log("Selected Subscription Plan:", selectedPlan);

    if (selectedCard) {
      const existingCartItem = state.items.find(
        (item) => item.product.id === selectedCard.id
      );

      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + quantity;
        console.log("Updating existing cart item. New quantity:", newQuantity);

        dispatch({
          type: "UPDATE_CART_ITEM_QUANTITY",
          payload: { id: selectedCard.id, quantity: newQuantity },
        });
      } else {
        const cartItem: CartItem = {
          physicalCardId: selectedCard.id,
          product: selectedCard,
          quantity: quantity,
          subscriptionPlan: selectedPlan,
        };

        console.log("Adding new item to cart:", cartItem);

        dispatch({ type: "ADD_TO_CART", payload: cartItem });
      }
    } else {
      console.warn("No card selected!");
    }
  };

  return (
    <div className="relative max-h-screen flex flex-col max-w-sm">
      {/* Dim Background Overlay */}
      {isExpanded && <div className="absolute inset-0 opacity-50 z-10"></div>}

      {/* Navigation Bar */}
      <NavBar title="Card Shop" href="/cards" />

      {/* Scrollable Middle Section */}
      <div className="flex-1 overflow-y-auto p-4 ">
        {/* Cards Grid */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow flex items-center justify-center mx-6 md:mx-0">
            {selectedPhysicalCard ? (
              <div className="flex items-center aspect-[16/10]">
                {selectedCard && (
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    width={300}
                    height={200}
                  />
                )}
              </div>
            ) : (
              <h1 className="text-primary">Select a card</h1>
            )}
          </div>
          <div className="h-20 md:h-24">
            <OrderCardsCarousel
              selectedCardId={selectedPhysicalCard}
              setSelectedCardId={(id: string) =>
                // Update the state `selectedPhysicalCard` with the selected card's ID
                // Typecast the ID to ensure it matches the `ChosenPhysicalCardType` type
                setSelectedPhysicalCard(id as ChosenPhysicalCardType)
              }
            />
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex justify-between items-center space-x-4 mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 text-2xl rounded">
            <Button
              onClick={decrementQuantity}
              variant="outline"
              className="border-2"
            >
              —
            </Button>
            <span className="border-2 p-1 text-lg w-12 text-center rounded-md">
              {quantity}
            </span>
            <Button
              onClick={incrementQuantity}
              className="border-2"
              variant="outline"
            >
              +
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={addItemToCart}
            className="flex gap-2 hover:bg-black dark:hover:bg-grayTemplate"
          >
            <ShoppingCart />
            <span>Add to Cart</span>
          </Button>
        </div>

        {/* Subscription Plan */}
        <div className="relative max-h-screen flex flex-col max-w-sm">
          {/* Subscription Plan Dropdown */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a Subscription Plan
            </label>
            <select
              value={selectedPlan?.id || ""}
              onChange={handlePlanChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {subscriptionPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ₱{plan.price} ({plan.durationDays} days)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Arrow Toggle Button */}
      <div className="relative z-20 bg-white dark:bg-transparent flex justify-center items-center border-t rounded-t-xl pt-4">
        <button onClick={toggleExpand} className="p-2 dark:bg-transparent ">
          {!isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isExpanded && (
          <Button
            className="p-2 absolute right-4"
            variant="outline"
            onClick={handleButtonTrash}
          >
            {!isTrash ? <Trash /> : <Check />}{" "}
          </Button>
        )}
      </div>

      {/* Collapsible Section */}
      <div
        className={`z-20 bg-white dark:bg-transparent overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-96 p-4" : "max-h-0 p-0"
        }`}
      >
        <h2 className="text-lg font-bold mb-2">Your Cart</h2>
        <div className="space-y-4 w-full h-96 overflow-y-auto pb-16 ">
          <Cart showTrash={isTrash} />
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className=" p-4  z-20 bg-white dark:bg-transparent ">
        <h1 className="mb-2">
          {totalItems} {totalItems === 1 ? "Card" : "Cards"} in Cart
        </h1>
        <div className="flex justify-between items-center">
          <p className="space-x-2">
            SubTotal: <span className="text-greenTitle">₱{subtotal}</span>
          </p>
          <Link href="/cards/checkout">
            <Button variant="green">Check Out</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPhysicalCard;
