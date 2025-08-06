import React, { useState } from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaSkype,
  FaGlobe,
  FaViber,
  FaTiktok,
  FaEllipsis,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "./ui/button";

interface SocialIconsPopupProps {
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  viberUrl?: string | null;
  whatsappNumber?: string | null;
  skypeInviteUrl?: string | null;
  websiteUrl?: string | null;
}

type IconEntry = {
  icon: React.ComponentType<{ size?: number }>;
  getHref: (value: string) => string;
};

const ICON_MAP: Record<keyof SocialIconsPopupProps, IconEntry> = {
  facebookUrl: { icon: FaFacebookF, getHref: (v) => v },
  twitterUrl: { icon: FaXTwitter, getHref: (v) => v },
  tiktokUrl: { icon: FaTiktok, getHref: (v) => v },
  youtubeUrl: { icon: FaYoutube, getHref: (v) => v },
  instagramUrl: { icon: FaInstagram, getHref: (v) => v },
  linkedinUrl: { icon: FaLinkedin, getHref: (v) => v },
  viberUrl: { icon: FaViber, getHref: (v) => v },
  whatsappNumber: { icon: FaWhatsapp, getHref: (v) => `https://wa.me/${v}` },
  skypeInviteUrl: { icon: FaSkype, getHref: (v) => `skype:${v}?chat` },
  websiteUrl: { icon: FaGlobe, getHref: (v) => v },
};

const SocialIconsPopup: React.FC<SocialIconsPopupProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableIcons = (
    Object.entries(ICON_MAP) as [keyof SocialIconsPopupProps, IconEntry][]
  )
    .filter(([key]) => {
      const value = props[key];
      return value !== null && value !== undefined && value.trim() !== "";
    })
    .map(([key, { icon: Icon, getHref }]) => {
      const href = getHref(props[key] as string);
      return (
        <Link key={key} href={href} target="_blank" rel="noopener noreferrer">
          <Icon size={22} />
        </Link>
      );
    });

  const visible = availableIcons.slice(0, 3);
  const hidden = availableIcons.slice(3);

  return (
    <>
      <div className="absolute top-52 grid grid-cols-1 place-items-center gap-6 ml-6">
        {visible}
        {hidden.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="More social icons"
            className="-mt-2"
          >
            <FaEllipsis size={18} />
          </button>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)} // Overlay click closes modal
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-sm text-center"
            style={{
              backgroundImage: 'url("/assets/template5bg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(e) => e.stopPropagation()} // Prevents modal close when clicking inside
          >
            <h2 className="text-lg font-semibold mb-4">All Social Links</h2>
            <div className="grid grid-cols-4 gap-6 justify-center items-center justify-items-center mx-auto">
              {availableIcons}
            </div>
            <Button
              className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-neutral-800"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialIconsPopup;
