import React from "react";
import { Construction } from "lucide-react";

export default function UsersOrdersPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Under Development</h1>
        <p className="text-lg text-gray-400 mb-6">
          This page is currently being built. Please check back later!
        </p>
        <Construction className="w-16 h-16 mx-auto text-yellow-500" />
      </div>
    </main>
  );
}
