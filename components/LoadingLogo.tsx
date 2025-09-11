"use client";
import dynamic from "next/dynamic";

// Dynamically import the TapUpCardLoader to avoid any SSR issues
const TapUpCardLoader = dynamic(() => import("./TapUpCardLoader"), {
  ssr: false,
});

export default function LoadingLogo() {
  return <TapUpCardLoader />;
}