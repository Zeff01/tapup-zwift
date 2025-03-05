"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChosenPhysicalCardType } from "@/components/forms/CardsAndUsersCreateFields";
import { OrderCardsCarousel } from "@/components/OrderCardsCarousel";
import { cardItems } from "@/constants";
import CardsAndUsersCreateFields from "@/components/forms/multi-step-form";
import { UserContextProvider } from "@/providers/user-provider";
import MultiStepFormUpdate from "@/components/forms/multi-step-form-update";
import { ExtendedUserInterface } from "@/types/types";

export default function CardPreviewEditor() {
  const [selectedPhysicalCard, setSelectedPhysicalCard] =
    useState<ChosenPhysicalCardType>("card1");

  const selectedCard = cardItems.find(
    (card) => card.id === selectedPhysicalCard
  );

  const sampleUserData: ExtendedUserInterface = {
    id: "user123",
    uid: "uid-456789",
    role: "user",
    onboarding: true,
    coverPhotoUrl: "",
    profilePictureUrl: "",
    position: "Software Engineer",
    company: "Tech Corp",
    companyBackground: "Leading tech solutions provider",
    serviceDescription: "We build modern web and mobile applications.",
    servicePhotos: ["/images/service1.jpg", "/images/service2.jpg"],
    chosenTemplate: "template1",
    chosenPhysicalCard: "card1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    number: "+1234567890",
    facebookUrl: "https://facebook.com/johndoe",
    youtubeUrl: "https://youtube.com/@johndoe",
    instagramUrl: "https://instagram.com/johndoe",
    twitterUrl: "https://twitter.com/johndoe",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    whatsappNumber: "+1234567890",
    skypeInviteUrl: "https://join.skype.com/invite/example",
    websiteUrl: "https://johndoe.com",
    printStatus: true,
    userCode: "JD12345",
    user_link: "https://myapp.com/johndoe",
  };

  // Store user data in local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sampleUserData", JSON.stringify(sampleUserData));
    }
  }, []);

  return (
    <div>
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
            setSelectedPhysicalCard(id as ChosenPhysicalCardType)
          }
        />
      </div>
      <UserContextProvider>
        <div>
          <MultiStepFormUpdate userData={sampleUserData} isOnboarding={true} />
        </div>
      </UserContextProvider>
    </div>
  );
}
