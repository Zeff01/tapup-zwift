"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { carouselCards } from "@/constants";
import CardDetails from "./card-details";

const TemplateSelection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedCard, setSelectedCard] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
      id="templates"
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-lg sm:text-xl text-muted-foreground mb-2">
            Pick a card to start
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
            Choose from our{" "}
            <motion.span 
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                premium cards
              </span>
            </motion.span>
          </h2>
        </motion.div>

        {/* Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12"
        >
          {Object.values(carouselCards).map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              onClick={() => setSelectedCard(index)}
              className={`relative cursor-pointer group ${
                selectedCard === index ? 'ring-2 ring-green-500 ring-offset-2' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] p-2">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />
                  
                  {/* Selection indicator */}
                  <AnimatePresence>
                    {selectedCard === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Card title on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium truncate">{card.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Card Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Card Preview */}
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-[4/3] max-w-lg mx-auto">
                  <Image
                    src={Object.values(carouselCards)[selectedCard].image}
                    alt={Object.values(carouselCards)[selectedCard].title}
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Card Info */}
              <div className="flex-1">
                <CardDetails card={Object.values(carouselCards)[selectedCard]} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TemplateSelection;