"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import tapupImg from "@/public/assets/Cards.png";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-8 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20 overflow-hidden"
      id="about"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex-1 max-w-2xl z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>NFC-Enabled Digital Business Cards</span>
        </motion.div>

        <motion.h1
          variants={textVariants}
          custom={1}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-center lg:text-left"
        >
          The{" "}
          <motion.span
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 animate-gradient">
              Ultimate Tool
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-lg opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.span>{" "}
          to Boost Your Business Interactions
        </motion.h1>

        <motion.p
          variants={textVariants}
          custom={2}
          className="text-lg sm:text-xl text-muted-foreground mt-6 md:mt-8 leading-relaxed text-center lg:text-left"
        >
          Create, share, and manage digital business cards effortlessly. With
          customizable designs, instant updates, and seamless integration across
          devices, make lasting impressions everywhere.
        </motion.p>

        <motion.div
          variants={textVariants}
          custom={3}
          className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
          <Link href="#quickguide">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold px-8 py-6 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-green-400 transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 relative w-full max-w-xl lg:max-w-2xl"
      >
        <motion.div
          animate={floatingAnimation}
          className="relative w-full h-full"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            <Image
              src={tapupImg}
              alt="TapUp NFC digital business cards showcase"
              priority
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
