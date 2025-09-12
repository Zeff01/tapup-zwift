"use client";

import { OrderCardsCarousel } from "@/components/OrderCardsCarousel";
import { CardThumbnailGrid } from "@/components/CardThumbnailGrid";
import { carouselCards } from "@/constants";
import { createPortfolioSchema } from "@/lib/zod-schema";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, AlertCircle, X, Plus, Minus } from "lucide-react";
import { BiSolidPurchaseTag } from "react-icons/bi";
import Image from "next/image";
import NavBar from "./Navbar";
import { SubscriptionPlan } from "@/types/types";
import { getSubscriptionPlans } from "@/lib/firebase/actions/user.action";
import { getAvailableCards } from "@/lib/firebase/actions/card-bank.action";
import { useCart } from "@/hooks/use-cart-v2";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

const OrderPhysicalCard = () => {
  const { addItem, totalItems, items, subtotal, removeItem, updateQuantity } = useCart();
  const router = useRouter();
  const [animations, setAnimations] = useState<
    { cardId: string | undefined; key: string }[]
  >([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [selectedPhysicalCard, setSelectedPhysicalCard] = useState("eclipse");
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  
  // Check stock availability for all cards
  const { data: stockData = {}, isLoading: isCheckingStock } = useQuery({
    queryKey: ["all-cards-stock"],
    queryFn: async () => {
      const stockByType: Record<string, number> = {};
      
      // Fetch stock for each card type
      await Promise.all(
        Object.keys(carouselCards).map(async (cardType) => {
          const availableCards = await getAvailableCards(cardType);
          stockByType[cardType] = availableCards.length;
        })
      );
      
      return stockByType;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const availableStock = stockData[selectedPhysicalCard] || 0;

  useEffect(() => {
    // Reset checkout state when component mounts
    setIsCheckoutClicked(false);
    
    return () => {
      Object.values(timeoutRefs.current).forEach((timeout) =>
        clearTimeout(timeout)
      );
    };
  }, []);

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

  const selectedCard =
    carouselCards[selectedPhysicalCard as keyof typeof carouselCards];

  const addToCart = () => {
    // Check stock before adding to cart
    if (availableStock === 0) {
      toast.error("This card is currently out of stock");
      return;
    }
    
    // Check if we already have the max quantity in cart
    const currentItem = items.find(item => item.id === selectedPhysicalCard);
    const currentQuantity = currentItem?.quantity || 0;
    
    if (currentQuantity >= availableStock) {
      toast.error(`Cannot add more. Only ${availableStock} ${selectedCard?.title} cards available in stock`);
      return;
    }
    
    addItem({
      id: selectedPhysicalCard,
      name: selectedCard?.title || "",
      price: selectedPlan?.price || 0,
      image: selectedCard?.image || "",
      description: selectedCard?.description || "Premium digital business card",
      subscriptionPlan: selectedPlan ?? undefined,
    });

    if (timeoutRefs.current[selectedPhysicalCard]) {
      clearTimeout(timeoutRefs.current[selectedPhysicalCard]);
    }

    setAnimations((prev) => {
      const filtered = prev.filter(
        (animation) => animation.cardId !== selectedPhysicalCard
      );
      const newAnimation = {
        cardId: selectedPhysicalCard,
        key: `${selectedPhysicalCard}-${Date.now()}`,
      };

      return [...filtered, newAnimation];
    });

    timeoutRefs.current[selectedPhysicalCard] = setTimeout(() => {
      setAnimations((prev) =>
        prev.filter((anim) => anim.cardId !== selectedPhysicalCard)
      );
      delete timeoutRefs.current[selectedPhysicalCard];
    }, 2000);
  };

  const currentAnimation = animations.find(
    (animate) => animate.cardId === selectedPhysicalCard
  );

  return (
    <div className="relative w-full flex flex-col">
      {/* Navigation Bar */}
      <NavBar title="Card Shop" href="/cards" />

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-6 overflow-y-auto p-4 md:px-6 lg:px-8 lg:pt-8">
        {/* CONTAINER I - Card Preview */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {selectedPhysicalCard ? (
              <div 
                className="flex items-center aspect-[16/10] relative w-full cursor-pointer preserve-3d"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                {selectedCard && (
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden">
                      <Image
                        src={selectedCard.image}
                        alt={`${selectedCard.title} Front`}
                        fill
                        className="object-contain size-full"
                      />
                    </div>
                    {/* Back of card */}
                    <div 
                      className="absolute w-full h-full backface-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <Image
                        src={selectedCard.backImage || selectedCard.image}
                        alt={`${selectedCard.title} Back`}
                        fill
                        className="object-contain size-full"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <h1 className="text-primary">Select a card</h1>
            )}
          </div>
        </div>

        {/* CONTAINER II - Card Details and Controls */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Card Description */}
          <div className="relative min-h-28 md:min-h-24 lg:min-h-32">
            <h1 className="scroll-m-20 text-left text-3xl font-extrabold tracking-tight text-balance mb-2">
              {selectedCard?.title || "Select a card"}
            </h1>
            <p className="leading-none font-medium text-pretty text-muted-foreground">
              {selectedCard?.description || "Choose a card design from the options below"}
            </p>
            {/* Stock indicator */}
            {selectedPhysicalCard && !isCheckingStock && (
              <div className="mt-2">
                {availableStock === 0 ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Out of stock</span>
                  </div>
                ) : availableStock && availableStock <= 5 ? (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Only {availableStock} left in stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-sm font-medium">In stock</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <CardThumbnailGrid
              selectedCardId={selectedPhysicalCard}
              setSelectedCardId={(id: string) =>
                setSelectedPhysicalCard(id as ChosenPhysicalCardType)
              }
              allowOutOfStockSelection={true}
            />
          </div>

          {/* Cart Summary */}
          {totalItems > 0 && (
            <div className="mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Cart Summary</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="flex items-center gap-3 flex-1">
                      <img src={item.image} alt={item.name} className="w-8 h-5 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">₱{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => {
                          const maxStock = stockData[item.id] || 0;
                          if (item.quantity >= maxStock) {
                            toast.error(`Only ${maxStock} ${item.name} cards available in stock`);
                            return;
                          }
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                        disabled={item.quantity >= (stockData[item.id] || 0)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-semibold text-lg">₱{subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="w-full md:flex md:gap-4 md:items-end md:justify-between lg:grid lg:grid-cols-1">
            {/* Subscription Plan */}
            <div className="relative flex-1 md:flex-none flex flex-col w-full lg:max-w-xs">
              {/* Subscription Plan Dropdown */}
              <div className="lg:mt-4 w-full">
                <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                  Choose a Subscription Plan
                </label>
                <select
                  value={selectedPlan?.id || ""}
                  onChange={handlePlanChange}
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - ₱{plan.price} ({plan.durationDays} days)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-2 mt-4 md:mt-0 md:gap-2 lg:pb-4">
              <Button
                size="lg"
                onClick={addToCart}
                variant="outline"
                disabled={
                  isCheckoutClicked || 
                  !selectedPlan || 
                  availableStock === 0 ||
                  (items.find(item => item.id === selectedPhysicalCard)?.quantity || 0) >= availableStock
                }
                className="flex w-full font-semibold md:w-40 lg:w-36 gap-2 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 relative"
              >
                <ShoppingCart />
                <span>
                  {(items.find(item => item.id === selectedPhysicalCard)?.quantity || 0) >= availableStock 
                    ? "Max in Cart" 
                    : "Add to Cart"}
                </span>
                <div className="absolute -top-10 max-[768px]:left-1/2 max-[768px]:-translate-x-1/2  md:top-1 md:right-4 ml-2 z-10 pointer-events-none">
                  <AnimatePresence>
                    {currentAnimation && (
                      <motion.div
                        key={currentAnimation.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="absolute whitespace-nowrap text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-md w-[140px]"
                      >
                        +1 {selectedCard?.title}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Button>
              <Button
                onClick={() => {
                  if (!selectedPlan || !selectedCard || isCheckoutClicked)
                    return;

                  setIsCheckoutClicked(true);
                  
                  // Reset state after 5 seconds if navigation fails
                  setTimeout(() => {
                    setIsCheckoutClicked(false);
                  }, 5000);

                  router.push("/cards/checkout");
                }}
                disabled={
                  isCheckoutClicked || !selectedPlan || totalItems === 0
                }
                size="lg"
                className="flex w-full md:w-40 lg:w-36 gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold"
              >
                {isCheckoutClicked ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Checking Out</span>
                  </>
                ) : (
                  <>
                    <BiSolidPurchaseTag />
                    <span>Checkout</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:px-8 hidden md:block lg:px-12">
        <CardThumbnailGrid
          selectedCardId={selectedPhysicalCard}
          setSelectedCardId={(id: string) =>
            setSelectedPhysicalCard(id as ChosenPhysicalCardType)
          }
          allowOutOfStockSelection={true}
        />
      </div>
    </div>
  );
};

export default OrderPhysicalCard;
