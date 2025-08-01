import React from "react";
import BackGround from "../_components/auth-background";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex justify-center items-center min-h-screen p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      
      <div className="flex bg-white dark:bg-gray-900/95 backdrop-blur-sm h-auto max-w-[950px] w-full rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex flex-1 items-center">
          <BackGround />
        </div>
        <div className="flex flex-1 items-center justify-center z-10 p-4 md:p-6">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
