"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the TapUpCardLoader to avoid any SSR issues
const TapUpCardLoader = dynamic(() => import("./TapUpCardLoader"), {
  ssr: false,
  loading: () => (
    <div className="bg-background flex items-center justify-center h-[100dvh]">
      <div className="animate-pulse">
        <div className="w-72 h-44 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="mt-4 h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
      </div>
    </div>
  ),
});

export default function LoadingLogo() {
  return (
    <Suspense fallback={
      <div className="bg-background flex items-center justify-center h-[100dvh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <TapUpCardLoader />
    </Suspense>
  );
}