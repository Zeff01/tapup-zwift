"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import GridLoader from "react-spinners/GridLoader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// const GridLoader = dynamic(() => import("react-spinners/GridLoader"));

interface LoadingOptionProps {
  isDarkMode: boolean;
  tapUpWhiteLogo: string;
  tapUpBlackLogo: string;
}

const images = {
  tapUpWhiteLogo: "/assets/tap-up-logo-white.png",
  tapUpBlackLogo: "/assets/tap-up-header-logo.png",
};

export default function LoadingLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <div className="bg-background flex flex-col items-center justify-center h-[100dvh]">
      <div className="flex flex-col items-center">
        {/* <LoadingOption1
          isDarkMode={isDarkMode}
          tapUpWhiteLogo={images.tapUpWhiteLogo}
          tapUpBlackLogo={images.tapUpBlackLogo}
        /> */}

        <LoadingOption2
          isDarkMode={isDarkMode}
          tapUpWhiteLogo={images.tapUpWhiteLogo}
          tapUpBlackLogo={images.tapUpBlackLogo}
        />
      </div>
    </div>
  );
}

const LoadingOption1: React.FC<LoadingOptionProps> = ({
  isDarkMode,
  tapUpWhiteLogo,
  tapUpBlackLogo,
}) => {
  return (
    <>
      <GridLoader size={20} color={isDarkMode ? "#FFFFFF" : "#108C28"} />

      <Image
        src={isDarkMode ? tapUpWhiteLogo : tapUpBlackLogo}
        alt="Company Logo"
        width={150}
        height={150}
        priority
        className="mx-auto mt-4"
      />
    </>
  );
};

const LoadingOption2: React.FC<LoadingOptionProps> = ({
  isDarkMode,
  tapUpWhiteLogo,
  tapUpBlackLogo,
}) => {
  return (
    <>
      <motion.div
        className="relative w-20 h-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-greenColor dark:border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </motion.div>

      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          type: "spring",
          stiffness: 150,
        }}
      >
        <Image
          src={isDarkMode ? tapUpWhiteLogo : tapUpBlackLogo}
          alt="Company Logo"
          width={150}
          height={150}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wQAAwAB/6kZ9gAAAABJRU5ErkJggg=="
          className="mx-auto mt-4"
        />
      </motion.div>
    </>
  );
};
