"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const titleVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.8, duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { yoyo: Infinity } },
  };

  return (
    <main className="flex flex-col min-h-screen justify-between bg-[#1E1E1E] text-white items-center pt-12 p-6 space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/assets/zwift-logo.png"
          alt="Company Logo"
          width={150}
          height={150}
          priority
          className="mx-auto mb-8"
        />
      </motion.div>

      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold"
      >
        Welcome to TapUp
      </motion.h1>

      <motion.p
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl"
      >
        Experience the future of networking with TapUp's NFC digital business
        cards. Perfect for professionals and entrepreneurs looking to make a
        lasting impact without the paper waste.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-3">Seamless Sharing</h2>
        <p className="mb-3">
          Simply tap your TapUp card to a phone, and watch your profile transfer
          instantly—no app required for the recipient!
        </p>
      </motion.div>

      <div className="text-center text-xs text-gray-500 mt-4">
        © 2024 ZwiftTech. All rights reserved.
      </div>
    </main>
  );
}
