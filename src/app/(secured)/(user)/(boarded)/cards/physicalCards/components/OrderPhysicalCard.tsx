"use client";
import SelectedPhysicalCard from "@/components/forms/SelectedPhysicalCard";
import { PhysicalCardCarousel } from "@/components/PhysicalCardCarousel";
import { createPortfolioSchema } from "@/lib/zod-schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBack, IoArrowUp, IoArrowDown } from "react-icons/io5";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";
import ComingSoon from "@/components/ComingSoon";
export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

const OrderPhysicalCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPhysicalCard, setSelectedPhysicalCard] =
    useState<ChosenPhysicalCardType>("card1");

  const toggleExpand = () => {
    +setIsExpanded(!isExpanded);
  };

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Define form
  const methods = useForm<z.infer<typeof createPortfolioSchema>>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      company: "",
      companyBackground: "",
      serviceDescription: "",
      coverPhotoUrl: "",
      servicePhotos: [],
      profilePictureUrl: "",
      position: "",
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      facebookUrl: "",
      youtubeUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      whatsappNumber: "",
      skypeInviteUrl: "",
      websiteUrl: "",
      chosenTemplate: "template1",
      chosenPhysicalCard: "card1",
    },
  });

  const [isComingSoon, setIsComingSoon] = useState(false);

  const handleClick = () => {
    setIsComingSoon((prev) => !prev);
  };

  return (
    <>
      {isComingSoon ? (
        <ComingSoon />
      ) : (
        <div className="relative max-h-screen flex flex-col max-w-[370px] ">
          {/* Dim Background Overlay */}
          {isExpanded && (
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          )}

          {/* Navigation Bar */}
          <div className="flex items-center p-3 space-x-4">
            <Link href="/cards" className="border p-2 rounded-md">
              <IoArrowBack className="text-lg" />
            </Link>
            <h1>Card Shop</h1>
          </div>

          {/* Scrollable Middle Section */}
          <div className="flex-1 overflow-y-auto p-4 ">
            {/* Cards Grid */}
            <div className="flex-grow flex flex-col">
              <div className="flex-grow flex items-center justify-center mx-6 md:mx-0">
                {selectedPhysicalCard ? (
                  <SelectedPhysicalCard
                    cardId={selectedPhysicalCard}
                    formData={methods.watch()}
                  />
                ) : (
                  <h1 className="text-black">Select a card</h1>
                )}
              </div>
              <div className="h-20 md:h-24">
                <PhysicalCardCarousel
                  selectedCardId={selectedPhysicalCard}
                  setSelectedCardId={setSelectedPhysicalCard}
                />
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex justify-between items-center space-x-4 mt-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 text-2xl border-gray-300 rounded">
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
              <Button onClick={handleClick} className="flex gap-2 ">
                <ShoppingCart />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>

          {/* Arrow Toggle Button */}
          <div className=" z-20 bg-white flex justify-center border-t rounded-t-xl pt-4">
            <button
              onClick={toggleExpand}
              className="p-2  bg-gray-100 rounded-full hover:bg-gray-200"
            >
              {!isExpanded ? <IoArrowUp /> : <IoArrowDown />}
            </button>
            {/* <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Trash />
        </button> */}
          </div>

          {/* Collapsible Section */}
          {isExpanded && (
            <div className=" p-4 z-20 bg-white ">
              <h2 className="text-lg font-bold mb-2">Your Cart</h2>
              <div className="space-y-4 w-full h-96 overflow-y-auto ">
                <Cart />
              </div>
            </div>
          )}

          {/* Fixed Bottom Section */}
          <div className=" p-4  z-20 bg-white ">
            <h1 className="mb-2">1 Card in Cart</h1>
            <div className="flex justify-between items-center">
              <p className="space-x-2">
                SubTotal: <span className="text-greenTitle">1000</span>
              </p>
              <Button variant="green" onClick={handleClick}>
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPhysicalCard;
