"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

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

export default function TemplatePreviewPage() {
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

  if (selectedTemplate === null || !templateComponents[selectedTemplate as keyof typeof templateComponents]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Template Selected</h1>
          <Link href="/preview-create">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back to Preview
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[selectedTemplate as keyof typeof templateComponents];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{templateNames[selectedTemplate]} Template</h1>
                <p className="text-sm text-gray-500">Preview your digital business card</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/preview-create?template=${selectedTemplate}`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Link href="/how-to-get-started">
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Get This Card
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          {/* Phone Mockup */}
          <div className="relative">
            <div className="relative max-w-[375px] mx-auto bg-black rounded-[3rem] p-3 shadow-2xl">
              <div className="absolute top-[50%] left-[-2px] transform -translate-y-1/2 w-1 h-16 bg-gray-800 rounded-r-md"></div>
              <div className="absolute top-[50%] right-[-2px] transform -translate-y-1/2 w-1 h-16 bg-gray-800 rounded-l-md"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
              
              <div className="relative bg-gray-100 rounded-[2.5rem] overflow-hidden" style={{ height: "812px" }}>
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-11 bg-white/90 z-10 flex items-center justify-between px-6">
                  <span className="text-xs font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-black rounded-sm">
                      <div className="w-full h-full bg-black rounded-sm scale-x-[0.7] origin-left"></div>
                    </div>
                  </div>
                </div>

                {/* Template Content */}
                <div className="h-full overflow-y-auto no-scrollbar pt-11">
                  {previewData && TemplateComponent && (
                    <React.Suspense fallback={
                      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                        <div className="text-sm text-gray-500">Loading preview...</div>
                      </div>
                    }>
                      {selectedTemplate === 5 ? (
                        // Template6 expects userData prop
                        React.createElement(TemplateComponent as any, {
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
                        React.createElement(TemplateComponent as any, {
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Your Digital Business Card is Ready!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This is how your card will look when someone taps your NFC card or scans your QR code. 
            All your information is displayed beautifully in the {templateNames[selectedTemplate]} template.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Instant Sharing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your profile with a simple tap - no app required
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Edit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Always Editable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update your info anytime - changes reflect instantly
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Save Contact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recipients can save your contact with one click
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}