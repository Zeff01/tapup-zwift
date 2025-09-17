"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  UserPlus, 
  CreditCard, 
  Package, 
  Smartphone,
  Check,
  Sparkles,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Timestamp } from "firebase/firestore";

// Template names mapping
const templateNames = [
  "Plain White", "Plain Black", "Viper", "Template 4", "Floral", "Template 6", 
  "Social Blue", "Connect", "Business", "Purple Aura", "Sky", "Dairy Green",
  "Urban Professional", "Template 14", "Neon Network", "Obsidian", "Designer Brand", "Ocean Depth"
];

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

export default function HowToGetStartedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateIndex = searchParams.get("template");
  const selectedTemplate = templateIndex ? parseInt(templateIndex) : null;
  const [previewData, setPreviewData] = useState<any>(null);

  // Load preview data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('tapup-preview-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPreviewData(parsedData);
      } catch (error) {
        console.error("Error parsing preview data:", error);
      }
    }
  }, []);

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up for Free",
      description: "Create your TapUp account in seconds. No credit card required to start.",
      color: "bg-blue-500",
    },
    {
      icon: CreditCard,
      title: "Order Your NFC Card",
      description: "Choose from our premium physical cards. Each card comes with NFC technology built-in.",
      color: "bg-green-500",
    },
    {
      icon: Package,
      title: "Receive Your Card",
      description: "Your card will be delivered to your doorstep. Shipping usually takes 5-7 business days.",
      color: "bg-purple-500",
    },
    {
      icon: Smartphone,
      title: "Activate & Customize",
      description: "Scan your card to activate it, then customize your digital profile with your template!",
      color: "bg-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              How to Get Your Digital Business Card
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              You've designed something amazing! Here's how to make it real and start sharing your professional profile.
            </p>
          </div>
        </div>

        {/* Template Preview Section */}
        {selectedTemplate !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Phone Mockup with Template Preview */}
                {previewData && (
                  <div className="flex-shrink-0">
                    <div className="relative max-w-[300px] mx-auto bg-black rounded-xl overflow-hidden border-2 border-gray-200 flex flex-col" style={{aspectRatio: "9/16"}}>
                      {/* Phone Screen */}
                      <div className="flex-grow max-h-[500px] overflow-y-auto no-scrollbar">
                        {/* Template Component */}
                        {selectedTemplate !== null && templateComponents[selectedTemplate as keyof typeof templateComponents] && (
                          <React.Suspense fallback={
                            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                              <div className="text-sm text-gray-500">Loading preview...</div>
                            </div>
                          }>
                            {selectedTemplate === 5 ? (
                              // Template6 expects userData prop
                              React.createElement(templateComponents[selectedTemplate as keyof typeof templateComponents] as any, {
                                userData: {
                                  id: "preview",
                                  profilePictureUrl: previewData.profilePictureUrl || "",
                                  coverPhotoUrl: previewData.coverPhotoUrl || "",
                                  firstName: previewData.firstName || "",
                                  lastName: previewData.lastName || "",
                                  email: previewData.email || "",
                                  number: previewData.number || "",
                                  position: previewData.position || "",
                                  facebookUrl: previewData.facebookUrl || "",
                                  linkedinUrl: previewData.linkedinUrl || "",
                                  instagramUrl: previewData.instagramUrl || "",
                                  twitterUrl: previewData.twitterUrl || "",
                                  tiktokUrl: previewData.tiktokUrl || "",
                                  youtubeUrl: previewData.youtubeUrl || "",
                                  whatsappNumber: previewData.whatsappNumber || "",
                                  websiteUrl: previewData.websiteUrl || "",
                                  viberUrl: previewData.viberUrl || "",
                                  customUrl: previewData.customUrl || "",
                                  companies: previewData.companies || [],
                                  owner: "preview-user",
                                  transferCode: "",
                                  disabled: false,
                                  createdAt: Timestamp.now()
                                }
                              })
                            ) : (
                              // Other templates expect individual props
                              React.createElement(templateComponents[selectedTemplate as keyof typeof templateComponents] as any, {
                                id: "preview",
                                profilePictureUrl: previewData.profilePictureUrl || "",
                                coverPhotoUrl: previewData.coverPhotoUrl || "",
                                firstName: previewData.firstName || "",
                                lastName: previewData.lastName || "",
                                email: previewData.email || "",
                                number: previewData.number || "",
                                position: previewData.position || "",
                                facebookUrl: previewData.facebookUrl || "",
                                linkedinUrl: previewData.linkedinUrl || "",
                                instagramUrl: previewData.instagramUrl || "",
                                twitterUrl: previewData.twitterUrl || "",
                                tiktokUrl: previewData.tiktokUrl || "",
                                youtubeUrl: previewData.youtubeUrl || "",
                                whatsappNumber: previewData.whatsappNumber || "",
                                websiteUrl: previewData.websiteUrl || "",
                                viberUrl: previewData.viberUrl || "",
                                customUrl: previewData.customUrl || "",
                                companies: previewData.companies || [],
                                owner: "preview-user",
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
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl font-bold mb-2">Your {templateNames[selectedTemplate]} Card</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {previewData ? 
                      "This is your personalized digital business card! Order your NFC card now to start sharing this profile with a simple tap." :
                      "Great job! You've selected a beautiful template. Order your NFC card now to start sharing this profile with a simple tap!"
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link href="/preview-create">
                      <Button variant="outline" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Edit Preview
                      </Button>
                    </Link>
                    <Link href={`/templates?preview=${selectedTemplate}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-6">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white relative`}>
                      <step.icon className="w-8 h-8" />
                      <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                  
                  {/* Check icon for completed feel */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Check className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Why TapUp?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Durable NFC cards that make a lasting impression</p>
            </div>
            <div>
              <Smartphone className="w-12 h-12 mx-auto mb-3 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold mb-2">Instant Sharing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share your profile with just a tap - no app needed</p>
            </div>
            <div>
              <Check className="w-12 h-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold mb-2">Always Updated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Change your info anytime - your card always shares the latest</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who've upgraded their networking game
          </p>
          
          <div className="space-y-4">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 px-8 py-6 text-lg"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}