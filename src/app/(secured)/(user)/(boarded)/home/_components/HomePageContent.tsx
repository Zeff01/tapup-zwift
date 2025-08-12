"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FeedSection from "./FeedSection";
import SidebarContent from "./SidebarContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function HomePageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:pr-80">
        <div className="max-w-2xl mx-auto p-4 lg:p-6">
          {/* Mobile Header with Menu */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              TapConnect
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 hidden lg:block"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to TapConnect
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your exclusive network of connections made through NFC card taps
            </p>
          </motion.div>

          {/* Feed Section */}
          <FeedSection />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto z-50 rtl-scrollbar home-panel-scrollbar
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}
