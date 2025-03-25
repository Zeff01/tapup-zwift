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
  const [userData, setUserData] = useState<ExtendedUserInterface | null>(null);

  const selectedCard = cardItems.find(
    (card) => card.id === selectedPhysicalCard
  );

  const sampleUserData: ExtendedUserInterface = {
    coverPhotoUrl: "",
    profilePictureUrl: "",
    position: "",
    company: "",
    companyBackground: "",
    serviceDescription: "",
    servicePhotos: [],
    chosenTemplate: "template1",
    chosenPhysicalCard: "card1",
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
    uid: "",
    role: "",
    onboarding: false,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("onboardingData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        localStorage.setItem("onboardingData", JSON.stringify(sampleUserData));
        setUserData(sampleUserData);
      }
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
          {userData && (
            <MultiStepFormUpdate userData={userData} isOnboarding={true} />
          )}
        </div>
      </UserContextProvider>
    </div>
  );
}
