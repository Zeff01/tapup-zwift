"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, Eye, Check } from "lucide-react";
import { motion } from "framer-motion";
import { carouselCards } from "@/constants";
import { cn } from "@/lib/utils";

// Template names for all 18 templates
const templateNames = [
  "Plain White", "Plain Black", "Viper", "Template 4", "Floral", "Template 6", 
  "Social Blue", "Connect", "Business", "Purple Aura", "Sky", "Dairy Green",
  "Urban Professional", "Template 14", "Neon Network", "Obsidian", "Designer Brand", "Ocean Depth"
];
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardDetails from "@/components/landing/card-details";
import dynamic from "next/dynamic";
import { Timestamp } from "firebase/firestore";

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

export default function TemplatesPage() {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Template Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of premium digital business card templates. 
              Select any template to get started instantly.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Template Count */}
          <div className="text-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              {templateNames.length} Premium Templates Available
            </Badge>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templateNames.map((templateName, index) => {
              const TemplateComponent = templateComponents[index as keyof typeof templateComponents];
              
              // Get template-specific images if available
              const getCoverPhoto = (templateIndex: number) => {
                const templateCovers: { [key: number]: string } = {
                  0: "/assets/template1coverphoto.png",
                  1: "/assets/template2coverphoto.png",
                  6: "/assets/template-7-cover-photo.jpeg",
                  8: "/assets/template9coverphoto.png",
                  9: "/assets/template10coverphoto.png",
                };
                return templateCovers[templateIndex] || "/assets/cover_placeholder.png";
              };
              
              const getProfilePic = (templateIndex: number) => {
                const templateProfiles: { [key: number]: string } = {
                  2: "/assets/template3samplepic.png",
                  3: "/assets/template4samplepic.png", 
                  9: "/assets/template10samplepic.png",
                };
                return templateProfiles[templateIndex] || "/assets/profile_placeholder.png";
              };
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className={cn(
                    "group cursor-pointer",
                    selectedTemplateIndex === index && "scale-105"
                  )}
                  onClick={() => {
                    setSelectedTemplateIndex(index);
                  }}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border-2",
                    selectedTemplateIndex === index
                      ? "border-green-500 shadow-2xl"
                      : "border-transparent"
                  )}>
                    {/* Phone Mockup with Template */}
                    <div className="relative p-3">
                      <div className="relative max-w-[280px] mx-auto bg-black rounded-xl overflow-hidden border-2 border-gray-200 flex flex-col" style={{aspectRatio: "9/16"}}>
                        {/* Phone Screen */}
                        <div className="flex-grow max-h-[450px] overflow-y-auto no-scrollbar">
                          {/* Template Component */}
                          {TemplateComponent && (
                            <React.Suspense fallback={
                              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                                <div className="text-sm text-gray-500">Loading...</div>
                              </div>
                            }>
                              {index === 5 ? (
                                // Template6 expects userData prop
                                React.createElement(TemplateComponent as any, {
                                  userData: {
                                    id: "sample",
                                    profilePictureUrl: getProfilePic(index),
                                    coverPhotoUrl: getCoverPhoto(index),
                                    firstName: "John",
                                    lastName: "Doe",
                                    email: "john.doe@example.com",
                                    number: "+1234567890",
                                    position: "CEO & Founder",
                                    facebookUrl: "https://facebook.com",
                                    linkedinUrl: "https://linkedin.com",
                                    instagramUrl: "https://instagram.com",
                                    twitterUrl: "https://twitter.com",
                                    tiktokUrl: "https://tiktok.com",
                                    youtubeUrl: "https://youtube.com",
                                    whatsappNumber: "+1234567890",
                                    websiteUrl: "https://example.com",
                                    viberUrl: "",
                                    customUrl: "",
                                    companies: [{
                                      id: "1",
                                      name: "TapUp Digital",
                                      position: "CEO & Founder",
                                      description: "Leading digital business card solutions"
                                    }],
                                    owner: "sample-user",
                                    transferCode: "",
                                    disabled: false,
                                    createdAt: Timestamp.now()
                                  }
                                })
                              ) : (
                                // Other templates expect individual props
                                React.createElement(TemplateComponent as any, {
                                  id: "sample",
                                  profilePictureUrl: getProfilePic(index),
                                  coverPhotoUrl: getCoverPhoto(index),
                                  firstName: "John",
                                  lastName: "Doe",
                                  email: "john.doe@example.com",
                                  number: "+1234567890",
                                  position: "CEO & Founder",
                                  facebookUrl: "https://facebook.com",
                                  linkedinUrl: "https://linkedin.com",
                                  instagramUrl: "https://instagram.com",
                                  twitterUrl: "https://twitter.com",
                                  tiktokUrl: "https://tiktok.com",
                                  youtubeUrl: "https://youtube.com",
                                  whatsappNumber: "+1234567890",
                                  websiteUrl: "https://example.com",
                                  viberUrl: "",
                                  customUrl: "",
                                  companies: [{
                                    id: "1",
                                    name: "TapUp Digital",
                                    position: "CEO & Founder",
                                    description: "Leading digital business card solutions"
                                  }],
                                  owner: "sample-user",
                                  transferCode: "",
                                  disabled: false,
                                  createdAt: Timestamp.now()
                                })
                              )}
                            </React.Suspense>
                          )}
                        </div>
                        <div className="flex-grow w-full flex justify-center items-center">
                          <div className="h-6 w-6 border-gray-300 border-2 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {selectedTemplateIndex === index && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 z-10">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {templateName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        Premium digital business card template with modern design
                      </p>
                      
                      {/* Template Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        <Badge variant="outline" className="text-xs">
                          Template {index + 1}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Digital Card
                        </Badge>
                      </div>
                      
                      {/* Use This Template Button */}
                      <Link href={`/preview-create?template=${index}`}>
                        <Button 
                          size="sm" 
                          className="w-full mt-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Use This Template
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}