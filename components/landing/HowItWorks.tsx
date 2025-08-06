"use client";

import Image from "next/image";
import card from "@/public/assets/Cards.png";
import { stepItem } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
      id="quickguide"
    >
      {/* Animated background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-transparent dark:from-green-900/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center">
            How
          </h2>
          <motion.div
            animate={
              isInView
                ? {
                    rotateZ: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <TapupLogo className="w-24 h-12 sm:w-32 sm:h-14 md:w-40 md:h-16" />
          </motion.div>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center">
            works
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {stepItem.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 h-full overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                <div className="flex items-start gap-6 relative z-10">
                  <motion.div
                    className="flex-shrink-0"
                    variants={numberVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
