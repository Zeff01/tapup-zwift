"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const cardDesigns = [
  {
    front: "/assets/cards/Eclipse-front.png",
    back: "/assets/cards/Eclipse-back.png",
    name: "Eclipse",
    gradient: "from-gray-900 to-black",
  },
  {
    front: "/assets/cards/Aurora-front.png",
    back: "/assets/cards/Aurora-back.png",
    name: "Aurora",
    gradient: "from-blue-500 to-green-400",
  },
  {
    front: "/assets/cards/Viper-Front.png",
    back: "/assets/cards/Viper-back.png",
    name: "Viper",
    gradient: "from-red-600 to-purple-600",
  },
];

export default function TapUpCardLoader() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Change card every 4 seconds (doubled from 2)
    const cardInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardDesigns.length);
    }, 4000);

    // Flip card every 2 seconds (doubled from 1)
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(cardInterval);
      clearInterval(flipInterval);
    };
  }, []);

  if (!mounted) {
    // Simple fallback while mounting
    return (
      <div className="bg-background flex items-center justify-center h-[100dvh]">
        <div className="animate-pulse">
          <div className="w-72 h-44 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const card = cardDesigns[currentCard];

  return (
    <div className="bg-background flex flex-col items-center justify-center h-[100dvh] overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 40% 50%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 60% 70%, #ec4899 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* 3D Card Container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card with 3D rotation */}
        <motion.div
          className="relative w-72 h-44 preserve-3d"
          animate={{
            rotateY: isFlipped ? 180 : 0,
            rotateZ: [0, 5, -5, 0],
          }}
          transition={{
            rotateY: { duration: 1.2, ease: "easeInOut" }, // Doubled from 0.6
            rotateZ: { duration: 3, ease: "easeInOut", repeat: Infinity }, // Increased from 2
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={card.front}
              alt={`${card.name} Front`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 288px"
              priority
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-300, 300],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.div>

          {/* Back of card */}
          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <Image
              src={card.back}
              alt={`${card.name} Back`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 288px"
              priority
            />
            {/* NFC animation on back */}
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-8"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <motion.path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  fill="currentColor"
                  className="text-white/50"
                />
                <motion.path
                  d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  fill="currentColor"
                  className="text-white/70"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  className="text-white"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles around card */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              x: [0, (i % 2 ? 1 : -1) * (50 + i * 20)],
              y: [0, -50 - i * 10, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h3
          className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          Loading TapUp
        </motion.h3>
        <motion.div className="flex items-center justify-center mt-2 space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom brand - using both logos for simplicity */}
      <motion.div
        className="absolute bottom-8 flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Image
          src="/assets/tap-up-logo-white.png"
          alt="TapUp"
          width={80}
          height={30}
          priority
          className="hidden dark:block"
          style={{ width: 'auto', height: 'auto' }}
        />
        <Image
          src="/assets/tap-up-header-logo.png"
          alt="TapUp"
          width={80}
          height={30}
          priority
          className="block dark:hidden"
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div>
    </div>
  );
}