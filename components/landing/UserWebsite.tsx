"use client";

import Image from "next/image";
import React, { useRef } from "react";
import templateImg from "../../public/images/templates-container.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLink, Smartphone, CreditCard, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const UserWebsite = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    { icon: Smartphone, text: "NFC Tap-to-Share" },
    { icon: Globe, text: "Personal Website" },
    { icon: CreditCard, text: "Digital Business Card" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background"
      id="userswebsite"
    >
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-100 to-transparent dark:from-green-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex gap-4 justify-center lg:justify-start mb-6 flex-wrap"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex justify-center items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm w-[180px]"
                >
                  <feature.icon className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Elevate your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                digital presence
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Combine the power of NFC technology with a stunning personal
              website. Share your contact information instantly with a tap,
              while maintaining a professional online presence that works 24/7.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/preview-create">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Create Your Digital Card
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold px-8 py-6 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  View Template Preview
                  <Smartphone className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={templateImg}
                alt="TapUp NFC-enabled digital business card website showcase"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* NFC indicator animation */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">NFC Enabled</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserWebsite;
