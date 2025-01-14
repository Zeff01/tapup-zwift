"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoComponent() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  console.log("Current Theme:", currentTheme);
  return (
    <div className="flex flex-col items-center justify-center gap-12 min-h-screen">
      <Image
        src={
          currentTheme === "dark"
            ? "/assets/tap-up-logo-white.png"
            : "/assets/tap-up-header-logo.png"
        }
        alt="Company Logo"
        width={150}
        height={150}
        priority
        className="mx-auto mt-4"
        style={{ objectFit: "cover" }}
      />
      <div className='flex space-x-2 justify-center items-center gap-3 dark:invert'>
        <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-5 w-5 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
