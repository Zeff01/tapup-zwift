"use client";

import { OrderCardsCarousel } from "@/components/OrderCardsCarousel";
import { carouselCards } from "@/constants";
import { createPortfolioSchema } from "@/lib/zod-schema";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { BiSolidPurchaseTag } from "react-icons/bi";
import Image from "next/image";
import NavBar from "./Navbar";
import { SubscriptionPlan } from "@/types/types";
import { getSubscriptionPlans } from "@/lib/firebase/actions/user.action";
import { useCart } from "@/hooks/use-cart-v2";
import { useRouter } from 'next/navigation';

export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

const OrderPhysicalCard = () => {
  const { addItem } = useCart();
  const router = useRouter();

  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );

  console.log(`selectedPlan: ${!selectedPlan}`);

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

  const [selectedPhysicalCard, setSelectedPhysicalCard] = useState("card1");

  const selectedCard =
    carouselCards[selectedPhysicalCard as keyof typeof carouselCards];

  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

  return (
    <div className="relative max-h-screen w-full flex flex-col">
      {/* Navigation Bar */}
      <NavBar title="Card Shop" href="/cards" />


      <div className="flex-1 lg:flex-none flex flex-col lg:grid lg:grid-cols-2 overflow-y-auto p-4 md:px-8 lg:pt-8">
        {/* CONTAINER I */}
        <div className="flex flex-col my-4 pb-4">
          <div className="flex items-center justify-center mx-6 md:mx-0 lg:ml-4 lg:mr-8">
            {selectedPhysicalCard ? (
              <div className="flex items-center aspect-[16/10] relative md:aspect-[1.601] w-full md:w-[28rem] shrink-0">
                {selectedCard && (
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    fill
                    className="object-contain size-full"
                  />
                )}
              </div>
            ) : (
              <h1 className="text-primary">Select a card</h1>
            )}
          </div>
        </div>

        {/* CONTAINER II */}
        <div className="flex-1 flex flex-col">
          {/* Card Description */}
          <div className="relative min-h-36 md:min-h-40 lg:min-h-44">
            <h1 className="scroll-m-20 text-left text-4xl md:text-5xl font-extrabold tracking-tight text-balance mb-2">{selectedCard.title}</h1>
            <p className="md:text-lg leading-none font-medium text-pretty text-muted-foreground">{selectedCard.description}</p>
          </div>

          <div className="lg:hidden">
            <OrderCardsCarousel
              selectedCardId={selectedPhysicalCard}
              setSelectedCardId={(id: string) =>
                setSelectedPhysicalCard(id as ChosenPhysicalCardType)
              }
            />
          </div>

          {/* Subscription Plan */}
          <div className="relative flex-1 md:flex-none flex flex-col max-w-sm">
            {/* Subscription Plan Dropdown */}
            <div className="lg:mt-4">
              <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                Choose a Subscription Plan
              </label>
              <select
                value={selectedPlan?.id || ""}
                onChange={handlePlanChange}
                className="mt-1 block w-full px-3 py-2 md:py-4 md:text-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {subscriptionPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ₱{plan.price} ({plan.durationDays} days)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fixed Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:mt-12 lg:mt-4 md:gap-4 lg:pb-4 bg-white dark:bg-transparent">
            <Button
              onClick={() =>
                addItem({
                  id: selectedPhysicalCard,
                  name: selectedCard?.title || "",
                  price: selectedPlan?.price || 0,
                  image: selectedCard?.image || "",
                  subscriptionPlan: selectedPlan ?? undefined,
                })
              }
              disabled={isCheckoutClicked || !selectedPlan}
              className="flex w-full gap-2 md:text-lg md:py-7 hover:bg-black dark:hover:bg-grayTemplate"
            >
              <ShoppingCart />
              <span>Add to Cart</span>
            </Button>
            <Button
              onClick={() => {
                if (!selectedPlan || !selectedCard || isCheckoutClicked) return;
                setIsCheckoutClicked(true);

                addItem({
                  id: selectedPhysicalCard,
                  name: selectedCard?.title || "",
                  price: selectedPlan?.price || 0,
                  image: selectedCard?.image || "",
                  subscriptionPlan: selectedPlan ?? undefined,
                });

                router.push("/cards/checkout");
              }}
              disabled={isCheckoutClicked || !selectedPlan}
              variant="green"
              className="w-full flex gap-2 md:text-lg md:py-7">
              {isCheckoutClicked
                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /><span>Checking Out...</span></>
                : <><BiSolidPurchaseTag /><span>Checkout</span></>}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full px-12 hidden lg:block">
        <OrderCardsCarousel
          selectedCardId={selectedPhysicalCard}
          setSelectedCardId={(id: string) =>
            setSelectedPhysicalCard(id as ChosenPhysicalCardType)
          }
        />
      </div>
    </div>
  );
};

export default OrderPhysicalCard;
