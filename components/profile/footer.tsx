import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ customUrl, websiteUrl }: Partial<Card>) => {
  return (
    <footer className="py-6 px-4 bg-gray-50 mt-auto">
      {/* Contact Buttons */}

      {/* Logo and Copyright */}
      <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-200">
        <a
          href={customUrl ?? websiteUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/assets/dark-ZwiftechLogo.png"
            alt="Zwiftech Logo"
            width={50}
            height={20}
            priority
            className="opacity-80"
          />
        </a>

        <span className="tracking-wide text-gray-500 text-xs font-medium">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
