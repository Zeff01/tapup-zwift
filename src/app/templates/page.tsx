"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Smartphone, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { carouselCards } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardDetails from "@/components/landing/card-details";

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
            // Grid View
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
                  {Object.keys(carouselCards).length} Premium Templates Available
                </Badge>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Object.values(carouselCards).map((card, index) => (
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
                      {/* Template Image */}
                      <div className="relative aspect-[3/4] p-3">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        
                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                                Preview
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {card.description || "Premium digital business card template"}
                        </p>
                        
                        {/* Template Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          <Badge variant="outline" className="text-xs">
                            Template {index + 1}
                          </Badge>
                          {card.category && (
                            <Badge variant="outline" className="text-xs">
                              {card.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
            // Details View
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
                    <div className="relative aspect-[3/4] max-w-lg mx-auto bg-white rounded-xl shadow-xl p-4">
                      <Image
                        src={Object.values(carouselCards)[selectedTemplate].image}
                        alt={Object.values(carouselCards)[selectedTemplate].title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mt-6">
                      <Link href={`/templates/${selectedTemplate}`}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        >
                          <Smartphone className="w-5 h-5 mr-2" />
                          View Template Preview
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
                    <CardDetails
                      card={Object.values(carouselCards)[selectedTemplate]}
                    />
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