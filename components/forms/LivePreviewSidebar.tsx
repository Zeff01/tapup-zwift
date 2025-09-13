"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SelectedTemplate from "./SelectedTemplate";
import {
  Eye,
  EyeOff,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Palette,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { ChosenTemplateType } from "./multi-step-form-update";

interface LivePreviewSidebarProps {
  selectedTemplateId: ChosenTemplateType;
  formData: any;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onTemplateChange?: (templateId: ChosenTemplateType) => void;
}

const availableTemplates: {
  id: ChosenTemplateType;
  name: string;
  category: string;
}[] = [
  { id: "template1", name: "Plain White", category: "Minimal" },
  { id: "template2", name: "Plain Black", category: "Minimal" },
  { id: "template3", name: "Viper", category: "Modern" },
  { id: "template4", name: "Minimalist", category: "Minimal" },
  { id: "template5", name: "Floral", category: "Creative" },
  { id: "template6", name: "Simple White", category: "Minimal" },
  { id: "template7", name: "Social Blue", category: "Modern" },
  { id: "template8", name: "Connect", category: "Creative" },
  { id: "template9", name: "Business", category: "Professional" },
  { id: "template10", name: "Purple Aura", category: "Creative" },
  { id: "template11", name: "Sky", category: "Modern" },
  { id: "template12", name: "Dairy Green", category: "Nature" },
  { id: "template13", name: "Urban Professional", category: "Creative" },
  { id: "template15", name: "Neon Network", category: "Modern" },
  { id: "template16", name: "Obsidian", category: "Creative" },
  { id: "template17", name: "Designer Brand", category: "Professional" },
  { id: "template18", name: "Ocean Depth", category: "Nature" },
];

export default function LivePreviewSidebar({
  selectedTemplateId,
  formData,
  isMinimized,
  onToggleMinimize,
  onTemplateChange,
}: LivePreviewSidebarProps) {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const currentTemplate = availableTemplates.find(
    (t) => t.id === selectedTemplateId
  );

  return (
    <>
      {/* Mobile Preview Button - visible on mobile only */}
      <Button
        onClick={() => setShowMobileModal(true)}
        className="fixed bottom-4 right-4 z-40 lg:hidden rounded-full h-12 w-12 p-0 shadow-lg"
        variant="default"
      >
        <Eye className="h-5 w-5" />
      </Button>

      {/* Mobile Preview Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileModal(false)}
          />

          {/* Modal Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  Mobile Preview
                </h3>
                <Button
                  onClick={() => setShowMobileModal(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>

              {/* Preview */}
              <div className="p-4">
                <div
                  className="max-w-[280px] mx-auto border-2 border-gray-200 rounded-xl overflow-hidden bg-black flex flex-col"
                  style={{ aspectRatio: "9/16" }}
                >
                  <div className="flex-grow max-h-[450px] overflow-y-auto no-scrollbar">
                    <SelectedTemplate
                      templateId={selectedTemplateId}
                      formData={formData}
                    />
                  </div>
                  <div className="flex-grow w-full flex justify-center items-center">
                    <div className="h-10 w-10 border-gray-300 border-2 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Current Template</p>
                    <p className="font-medium">{currentTemplate?.name}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {currentTemplate?.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - hidden on mobile */}
      <motion.div
        animate={{
          width: isMinimized ? "4rem" : "24rem",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-30 hidden lg:block"
      >
        {/* Minimize/Maximize Toggle */}
        <div className="relative">
          <div className="flex justify-between items-center p-4 border-b">
            {!isMinimized ? (
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  Mobile Preview
                </h3>
                <p className="text-sm text-gray-500">
                  Live preview of your card
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <Button
              onClick={onToggleMinimize}
              variant="ghost"
              size="sm"
              className={
                isMinimized
                  ? "absolute -left-3 rounded-full h-6 w-6 p-0 bg-white dark:bg-gray-800 border border-gray-400 shadow-md"
                  : "ml-auto"
              }
            >
              {isMinimized ? (
                <ChevronLeft className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Minimized Icons */}
        {isMinimized && (
          <div className="flex flex-col items-center py-4 space-y-4">
            {/* <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-lg"
              onClick={() => onToggleMinimize()}
            >
              <Eye className="h-4 w-4 text-gray-500" />
            </Button> */}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-lg"
              onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            >
              <Palette className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}

        {/* Content - only show when not minimized */}
        {!isMinimized && (
          <div
            className="p-4 space-y-4 overflow-y-auto no-scrollbar"
            style={{ height: "calc(100vh - 80px)" }}
          >
            {/* Current Template Info */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Current Template</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium">
                        {currentTemplate?.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {currentTemplate?.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowTemplateSelector(!showTemplateSelector)
                    }
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Template Selector */}
            <AnimatePresence>
              {showTemplateSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        Quick Template Switch
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {availableTemplates.map((template) => (
                          <Button
                            key={template.id}
                            variant={
                              selectedTemplateId === template.id
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => onTemplateChange?.(template.id)}
                            className="text-xs h-8"
                          >
                            {template.name}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Preview Container */}
            <div className="relative">
              <div
                className="max-w-[320px] mx-auto border-2 border-gray-200 rounded-xl overflow-hidden bg-black flex flex-col"
                style={{ aspectRatio: "9/16" }}
              >
                <div className="flex-grow max-h-[490px] overflow-y-auto no-scrollbar ">
                  <SelectedTemplate
                    templateId={selectedTemplateId}
                    formData={formData}
                  />
                </div>
                <div className="flex-grow w-full flex justify-center items-center">
                  <div className="h-12 w-12 border-gray-300 border-2 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Template:</span>
                    <span className="font-medium">{currentTemplate?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">View:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Smartphone className="h-3 w-3" />
                      Mobile
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>📱 Mobile-First:</strong> Your digital business
                      card is optimized for mobile devices. All changes update
                      instantly as you type!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </>
  );
}
