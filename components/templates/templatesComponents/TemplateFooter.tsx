import React from "react";
import Image from "next/image";
import { cn, getCopyrightYear } from "@/lib/utils";

interface TemplateFooterProps {
  className?: string;
  theme?: "light" | "dark";
  yearClassName?: string;
}

export const TemplateFooter: React.FC<TemplateFooterProps> = ({
  className = "",
  theme = "light",
  yearClassName = "tracking-wide text-gray-600 text-[10px]",
}) => {
  const tapupLogo =
    theme === "dark"
      ? "/assets/tap-up-logo-white.png"
      : "/assets/tap-up-logo-black.png";

  const ZwiftechLogo =
    theme === "dark"
      ? "/assets/light-ZwiftechLogo.png"
      : "/assets/dark-ZwiftechLogo.png";

  return (
    <footer
      className={cn(
        "flex flex-col mt-8 items-center gap-1 text-center pb-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <a
          href="https://www.tapup.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={tapupLogo}
            alt="TapUp Logo"
            width={30}
            height={12}
            priority
            className="opacity-90"
          />
        </a>
        <a
          href="https://zwiftech.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={ZwiftechLogo}
            alt="Zwiftech Logo"
            width={30}
            height={12}
            priority
            className="opacity-90"
          />
        </a>
      </div>

      <span className={yearClassName}>
        © {getCopyrightYear()} Zwiftech. All Rights Reserved.
      </span>
    </footer>
  );
};
