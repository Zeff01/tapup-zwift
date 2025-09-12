"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { carouselCards } from "@/constants";
import CardDetails from "@/components/landing/card-details";

interface TemplatePageProps {
  params: { id: string };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const { id } = params;
  const cardIndex = parseInt(id, 10);
  const cardsArray = Object.values(carouselCards);
  const card = cardsArray[cardIndex];

  if (!card) {
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
      <h1 className="text-3xl font-bold mb-8 text-center">{card.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 flex justify-center items-center">
          {/* Mock phone frame */}
          <div className="relative w-[320px] h-[660px] bg-white rounded-[3rem] shadow-2xl border-2 border-gray-400 flex items-center justify-center overflow-hidden">
            {/* Speaker */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-2 bg-gray-300 rounded-full opacity-80 z-10" />
            {/* Camera dot */}
            <div className="absolute top-5 right-16 w-3 h-3 bg-gray-300 rounded-full opacity-80 z-10" />
            {/* Card image inside phone with scanning effect overlay */}
            <div
              className="relative w-[300px] h-[560px] flex items-center justify-center"
              style={{ marginTop: "64px", marginBottom: "64px" }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-contain rounded-xl bg-white shadow-md border border-gray-100"
              />
              {/* Scanning effect overlay */}
              <span className="pointer-events-none absolute left-0 top-0 w-full h-full overflow-hidden rounded-xl z-20">
                <span className="block absolute left-0 top-1/2 -translate-y-1/2 w-full h-28 bg-gradient-to-b from-green-400/60 via-green-200/20 to-transparent animate-scan-pingpong" />
              </span>
            </div>
            {/* Add scanning animation */}
            <style jsx global>{`
              @keyframes scan-pingpong {
                0% {
                  transform: translateY(-120px);
                  opacity: 0.2;
                }
                10% {
                  opacity: 0.6;
                }
                50% {
                  transform: translateY(120px);
                  opacity: 0.2;
                }
                60% {
                  opacity: 0.6;
                }
                100% {
                  transform: translateY(-120px);
                  opacity: 0.2;
                }
              }
              .animate-scan-pingpong {
                animation: scan-pingpong 3.8s linear infinite;
              }
            `}</style>
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
