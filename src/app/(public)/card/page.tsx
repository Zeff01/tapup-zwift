"use client";
import { Button } from "@/components/ui/button";
import { carouselCards } from "@/constants";
import { useCart } from "@/hooks/use-cart-v2";
import { cn, formatCurrency } from "@/lib/utils";
import { useUserContext } from "@/providers/user-provider";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Shield, ShoppingCart, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";

//prevent mismatch during the first render
const TapUpCarousel = dynamic(
  () => import("../../../../components/landing/carouselCard"),
  {
    ssr: false,
  }
);

const CardPurchasePreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParamsTitle = searchParams.get("title");
  const { addItem } = useCart();
  const [animations, setAnimations] = useState<
    { cardId: string | undefined; key: string }[]
  >([]);
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const { user } = useUserContext();

  const [title, setTitle] = useState(queryParamsTitle);

  const handleSetTitle = (newTitle: string) => {
    setTitle(newTitle);
    // Update URL without causing reload
    const newUrl = `/card?title=${encodeURIComponent(newTitle)}`;
    window.history.replaceState({}, "", newUrl);
  };

  const card =
    Object.values(carouselCards).find((card) => card.title === title) || null;

  const features = [
    { icon: CreditCard, text: "NFC Enabled" },
    { icon: Shield, text: "Premium Quality" },
    { icon: Sparkles, text: "Instant Sharing" },
  ];

  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach((timeout) =>
        clearTimeout(timeout)
      );
    };
  }, []);

  const addToCart = () => {
    if (!card?.id) return;

    addItem({
      id: card.id.replace(/-/g, "") || "",
      name: card.title || "",
      price: card.price || 0,
      image: card.image || "",
    });

    if (timeoutRefs.current[card.id]) {
      clearTimeout(timeoutRefs.current[card.id]);
    }

    setAnimations((prev) => {
      const filtered = prev.filter((animation) => animation.cardId !== card.id);
      const newAnimation = {
        cardId: card.id,
        key: `${card.id}-${Date.now()}`,
      };

      return [...filtered, newAnimation];
    });

    timeoutRefs.current[card.id] = setTimeout(() => {
      setAnimations((prev) => prev.filter((anim) => anim.cardId !== card.id));
      delete timeoutRefs.current[card.id];
    }, 2000);
  };

  const currentAnimation = animations.find(
    (animate) => animate.cardId === card?.id
  );

  return (
    <React.Fragment>
      {/* Hero Section with Product */}
      <section className="min-h-screen py-12 md:py-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
          <motion.article className="flex flex-col items-center">
            {/* Product Image - Large Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full mb-12"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative aspect-[1.6] max-w-2xl mx-auto"
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl blur-3xl opacity-20" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl p-8 h-full"
                  >
                    <Image
                      src={card?.image as string}
                      alt={`${card?.title} NFC Business Card`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Product Details Section */}
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Left Column - Product Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Features badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                    >
                      <feature.icon className="w-4 h-4" />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between min-h-[320px] md:min-h-[290px]"
                  >
                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                        {card?.title}
                      </h1>

                      <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                        {card?.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        Price
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold text-green-600">
                        {formatCurrency(card?.price as number)}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => {
                      addItem({
                        id: card?.id.replace(/-/g, "") || "",
                        name: card?.title || "",
                        price: card?.price || 0,
                        image: card?.image || "",
                      });
                      router.push(user ? "/cards/checkout" : "/delivery-form");
                    }}
                  >
                    Buy Now
                    <BiSolidPurchaseTag className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 font-semibold px-8 py-6 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 relative"
                    onClick={addToCart}
                  >
                    Add to Cart
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    <div className="absolute -top-10 max-[1024px]:left-1/3 lg:top-2 lg:right-4 ml-2 z-10 pointer-events-none">
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
                            +1 {card?.title}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Button>
                </div>
              </motion.div>

              {/* Right Column - Available Designs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Available Designs</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {Object.values(carouselCards).map((cardItem, i) => (
                      <motion.div
                        key={`card-${i}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl",
                          title === cardItem.title &&
                            "ring-2 ring-green-500 ring-offset-2"
                        )}
                        onClick={() => handleSetTitle(cardItem.title)}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={cardItem.image as string}
                            alt={`${cardItem.title} design`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium truncate">
                            {cardItem.title}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CardPurchasePreviewPage;
