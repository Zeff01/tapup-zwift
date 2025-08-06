"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardTemplates = [
    {
      src: "/assets/cards/back/card7.png",
      alt: "Modern Business Card Template",
      color: "from-purple-400 to-pink-400",
    },
    {
      src: "/assets/cards/back/card6.png",
      alt: "Professional Card Template",
      color: "from-blue-400 to-cyan-400",
    },
    {
      src: "/assets/cards/back/card1.png",
      alt: "Classic Card Template",
      color: "from-green-400 to-emerald-400",
    },
    {
      src: "/assets/cards/back/card4.png",
      alt: "Creative Card Template",
      color: "from-orange-400 to-red-400",
    },
    {
      src: "/assets/cards/back/card5.png",
      alt: "Minimalist Card Template",
      color: "from-indigo-400 to-purple-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-gray-900 overflow-hidden"
      id="products"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Premium Designs</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
            With our{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 animate-gradient">
                premium templates
              </span>
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
        >
          {cardTemplates.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -15,
                rotateY: 15,
                rotateX: -5,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Card container */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform" />

                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-xl mb-2">
                        {card.alt}
                      </p>
                      <p className="text-white/80 text-sm">
                        Click to preview and customize
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* 3D shadow effect */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-700 dark:to-gray-900 rounded-2xl transform translate-y-2 scale-95 opacity-50 blur-xl group-hover:translate-y-4 group-hover:scale-90 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/cards">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center text-lg">
                Browse All Templates
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
