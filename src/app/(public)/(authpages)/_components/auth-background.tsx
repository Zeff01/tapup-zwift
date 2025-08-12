"use client";

import Image from "next/image";
import Logo from "@/public/images/logo.png";
import TapUp from "@/public/images/TapUp.png";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles, CreditCard, Smartphone } from "lucide-react";

const fonts = Inter({
  subsets: ["latin"],
  weight: ["400", "200"],
});

export default function BackGround() {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-green-500 to-emerald-600 w-full h-full relative rounded-3xl overflow-hidden p-6">
      {/* Animated patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={Logo}
          alt="TapUp Logo"
          height={80}
          width={80}
          className="relative z-10"
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1
            className={cn(
              fonts.className,
              "text-xl md:text-2xl font-bold text-white mb-2"
            )}
          >
            Transform Your Networking
            <span className="block text-white/90">
              with Digital Business Cards
            </span>
          </h1>
          <p className={cn(fonts.className, "text-sm text-white/80 mb-3")}>
            Share your professional information instantly
            <span className="block">with a simple tap.</span>
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Smartphone className="h-5 w-5" />
            </div>
            <span className="text-sm">NFC-enabled instant sharing</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm">Premium card designs</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-sm">Real-time analytics</span>
          </div>
        </motion.div>
      </div>

      {/* Card preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-0 right-0 w-[300px] h-[200px] opacity-30"
      >
        <Image
          fill
          src={TapUp}
          alt="TapUp Card Preview"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
