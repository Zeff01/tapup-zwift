"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { carouselCards } from "@/constants";

// Template names for all 18 templates
const templateNames = [
  "Eclipse", "Aurora", "Viper", "Vortex", "Bloom", "Neon",
  "Cosmos", "Phoenix", "Glacier", "Storm", "Zen", "Flame",
  "Ocean", "Forest", "Desert", "Sky", "Earth", "Solar"
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
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "details">("grid");

  const handleTemplateSelect = (index: number) => {
    setSelectedTemplate(index);
    setViewMode("details");
  };

  const handleBackToGrid = () => {
    setViewMode("grid");
    setSelectedTemplate(null);
  };

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
              Click on any template to see it in action.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8"
            >
              {/* Template Count */}
              <div className="text-center">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  {templateNames.length} Premium Templates Available
                </Badge>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {templateNames.map((templateName, index) => {
                  const TemplateComponent = templateComponents[index as keyof typeof templateComponents];
                  
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      className="group cursor-pointer"
                      onClick={() => handleTemplateSelect(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                        {/* Phone Mockup with Template */}
                        <div className="relative aspect-[3/4] p-3">
                          <div className="relative w-full h-full bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden">
                            {/* Phone Frame */}
                            <div className="absolute inset-2 bg-white rounded-[1.5rem] overflow-hidden">
                              {/* Template Component */}
                              <div className="w-full h-full overflow-hidden scale-[0.3] origin-top-left">
                                <div className="w-[333%] h-[333%]">
                                  {TemplateComponent && (
                                    <React.Suspense fallback={
                                      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                                        <div className="text-sm text-gray-500">Loading...</div>
                                      </div>
                                    }>
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
                                        createdAt={Timestamp.now()}
                                      />
                                    </React.Suspense>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Phone Details */}
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                            <div className="absolute top-1 right-4 w-1 h-1 bg-gray-600 rounded-full"></div>
                          </div>
                          
                          {/* Overlay with actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                            <div className="space-y-3">
                              <Button
                                size="sm"
                                className="bg-white text-black hover:bg-gray-100 w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTemplateSelect(index);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Link href={`/templates/${index}`} onClick={(e) => e.stopPropagation()}>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="w-full"
                                >
                                  <Smartphone className="w-4 h-4 mr-2" />
                                  Full Preview
                                </Button>
                              </Link>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Ready to create your digital business card?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Choose a template and start building your professional presence today.
                </p>
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBackToGrid}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>

              {selectedTemplate !== null && (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Template Preview */}
                  <div className="flex-1 lg:sticky lg:top-8">
                    <div className="relative max-w-sm mx-auto">
                      {/* Phone Mockup */}
                      <div className="relative w-[280px] h-[580px] mx-auto bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden">
                        {/* Phone Screen */}
                        <div className="absolute inset-4 bg-white rounded-[2.5rem] overflow-hidden">
                          {/* Template Component */}
                          <div className="w-full h-full overflow-auto">
                            {(() => {
                              const TemplateComponent = templateComponents[selectedTemplate as keyof typeof templateComponents];
                              return TemplateComponent ? (
                                <React.Suspense fallback={
                                  <div className="flex items-center justify-center h-full">
                                    <div className="text-gray-500">Loading template...</div>
                                  </div>
                                }>
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
                                    createdAt={Timestamp.now()}
                                  />
                                </React.Suspense>
                              ) : null;
                            })()}
                          </div>
                        </div>
                        
                        {/* Phone Details */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                        <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mt-6">
                      <Link href={`/templates/${selectedTemplate}`}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        >
                          <Smartphone className="w-5 h-5 mr-2" />
                          Interactive Preview
                        </Button>
                      </Link>
                      <Link href="/onboarding">
                        <Button size="lg" variant="outline">
                          Use This Template
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Template Details */}
                  <div className="flex-1">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{templateNames[selectedTemplate]}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          Premium digital business card template designed for modern professionals
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Template Features</h3>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Responsive mobile design</li>
                            <li>• Social media integration</li>
                            <li>• Contact information display</li>
                            <li>• Professional layout</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Perfect For</h3>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Business professionals</li>
                            <li>• Entrepreneurs</li>
                            <li>• Freelancers</li>
                            <li>• Creative professionals</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                          Customization Options
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          Easily customize colors, fonts, images, and content to match your personal brand and professional style.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}