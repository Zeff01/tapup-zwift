"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { carouselCards } from "@/constants";
import CardDetails from "@/components/landing/card-details";
import dynamic from "next/dynamic";
import { FieldValue } from "firebase/firestore";

// Dynamically import template components
const templateComponents = {
  0: dynamic(() => import("@/components/templates/Template1")),
  1: dynamic(() => import("@/components/templates/Template2")),
  2: dynamic(() => import("@/components/templates/Template3")),
  3: dynamic(() => import("@/components/templates/Template4")),
  4: dynamic(() => import("@/components/templates/Template5")),
  5: dynamic(() => import("@/components/templates/Template6")),
  6: dynamic(() => import("@/components/templates/Template7")),
  7: dynamic(() => import("@/components/templates/Template8")),
  8: dynamic(() => import("@/components/templates/Template9")),
  9: dynamic(() => import("@/components/templates/Template10")),
  10: dynamic(() => import("@/components/templates/Template11")),
  11: dynamic(() => import("@/components/templates/Template12")),
  12: dynamic(() => import("@/components/templates/Template13")),
  13: dynamic(() => import("@/components/templates/Template14")),
  14: dynamic(() => import("@/components/templates/Template15")),
  15: dynamic(() => import("@/components/templates/Template16")),
  16: dynamic(() => import("@/components/templates/Template17")),
  17: dynamic(() => import("@/components/templates/Template18")),
};

interface TemplatePageProps {
  params: { id: string };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const { id } = params;
  const cardIndex = parseInt(id, 10);
  const cardsArray = Object.values(carouselCards);
  const card = cardsArray[cardIndex];
  
  // Get the corresponding template component
  const TemplateComponent = templateComponents[cardIndex as keyof typeof templateComponents];

  if (!card || !TemplateComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <p className="text-gray-500">
          The template you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">{card.title} - Template Preview</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 flex justify-center items-center">
          {/* Mock phone frame */}
          <div className="relative w-[320px] h-[660px] bg-white rounded-[3rem] shadow-2xl border-2 border-gray-400 flex items-center justify-center overflow-hidden">
            {/* Speaker */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-2 bg-gray-300 rounded-full opacity-80 z-10" />
            {/* Camera dot */}
            <div className="absolute top-5 right-16 w-3 h-3 bg-gray-300 rounded-full opacity-80 z-10" />
            {/* Template component inside phone */}
            <div
              className="relative w-[300px] h-[560px] overflow-y-auto overflow-x-hidden bg-white rounded-xl"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {/* Template content with sample data */}
              <div className="w-full h-full">
                <TemplateComponent 
                  id="sample"
                  profilePictureUrl="/assets/profile_placeholder.png"
                  coverPhotoUrl="/assets/cards/cover-placeholder.jpg"
                  firstName="John"
                  lastName="Doe"
                  email="john.doe@example.com"
                  number="+1234567890"
                  position="CEO & Founder"
                  facebookUrl="https://facebook.com"
                  linkedinUrl="https://linkedin.com"
                  instagramUrl="https://instagram.com"
                  twitterUrl="https://twitter.com"
                  tiktokUrl="https://tiktok.com"
                  youtubeUrl="https://youtube.com"
                  whatsappNumber="+1234567890"
                  websiteUrl="https://example.com"
                  viberUrl=""
                  customUrl=""
                  companies={[{
                    id: "1",
                    name: "TapUp Digital",
                    position: "CEO & Founder",
                    description: "Leading digital business card solutions"
                  }]}
                  owner="sample-user"
                  transferCode=""
                  disabled={false}
                  createdAt={new Date()}
                />
            </div>
            {/* Home button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full opacity-80 z-10" />
          </div>
        </div>
        <div className="flex-1">
          <CardDetails card={card} />
        </div>
      </div>
    </div>
  );
}
