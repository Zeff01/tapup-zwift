"use client";

import Image from "next/image";
import demoCard from "@/public/assets/tap-up-demo-card.png";
import { tapupLearnMoreList } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import Check from "../svgs/Check";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutTapup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden"
      id="features"
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-3 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center">
            Power up with
          </h2>
          <motion.div
            animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TapupLogo className="w-24 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-full max-w-md lg:max-w-lg flex-shrink-0"
          >
            <motion.div
              animate={isInView ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square card-3d"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                <Image
                  src={demoCard}
                  alt="TapUp Demo Card"
                  width={519}
                  height={436}
                  priority
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 space-y-6"
          >
            {tapupLearnMoreList.map((item, index) => (
              <motion.div
                key={`feature-${index}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                className="group relative flex gap-6 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shine"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className="flex-shrink-0 z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <motion.div
                  className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTapup;
