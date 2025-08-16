import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
  FaSkype,
  FaGlobe,
} from "react-icons/fa";
import { SiTiktok, SiViber } from "react-icons/si";

import { editCardSchema } from "@/lib/zod-schema";
import { z } from "zod";

interface SocialLink {
  label: string;
  icon: React.ReactNode;
  key: keyof z.infer<typeof editCardSchema>;
  value: string;
}

interface FormValues {
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  skypeInviteUrl?: string;
  websiteUrl?: string;
  viberUrl?: string;
  tiktokUrl?: string;
}
interface SocialLinksSelectorProps {
  onAddLink: (link: SocialLink) => void; // Callback to parent when a link is selected
  existingValues?: FormValues;
  selectedLinkKeys?: string[];
}

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    icon: <FaFacebook />,
    key: "facebookUrl",
    value: "https://www.facebook.com/",
  },
  { label: "Website", icon: <FaGlobe />, key: "websiteUrl", value: "" },
  {
    label: "Instagram",
    icon: <FaInstagram />,
    key: "instagramUrl",
    value: "https://www.instagram.com/",
  },
  {
    label: "X (Twitter)",
    icon: <FaTwitter />,
    key: "twitterUrl",
    value: "https://x.com/",
  },
  {
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    key: "whatsappNumber",
    value: "",
  },
  {
    label: "Viber",
    icon: <SiViber />,
    key: "viberUrl",
    value: "",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin />,
    key: "linkedinUrl",
    value: "https://www.linkedin.com/in/",
  },
  {
    label: "YouTube",
    icon: <FaYoutube />,
    key: "youtubeUrl",
    value: "https://www.youtube.com/",
  },
  {
    label: "TikTok",
    icon: <SiTiktok />,
    key: "tiktokUrl",
    value: "https://www.tiktok.com/",
  },
  {
    label: "Skype",
    icon: <FaSkype />,
    key: "skypeInviteUrl",
    value: "",
  },
];

const SocialLinksSelector: React.FC<SocialLinksSelectorProps> = ({
  onAddLink,
  existingValues = {},
  selectedLinkKeys = [],
}) => {
  const [search, setSearch] = useState<string>("");

  const getAvailableLinks = () => {
    return socialLinks.filter((link) => {
      // Only exclude links that are currently in the selectedLinkKeys array
      return !selectedLinkKeys.includes(link.key);
    });
  };

  const [availableLinks, setAvailableLinks] =
    useState<SocialLink[]>(getAvailableLinks());

  // Update available links when selectedLinkKeys changes
  React.useEffect(() => {
    setAvailableLinks(getAvailableLinks());
  }, [selectedLinkKeys]);
  const filteredLinks = availableLinks.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (link: SocialLink) => {
    onAddLink(link);

    setAvailableLinks((prev) => prev.filter((item) => item.key !== link.key));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="mt-4">
          {availableLinks.length > 0
            ? `+ Add Social Link`
            : "All Social Links Added"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          {/* Search Input */}
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          <div className="text-sm font-semibold">Social Links</div>
          <div className="space-y-2">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <div
                  key={link.key}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-green-500"
                  onClick={() => handleSelect(link)}
                >
                  {link.icon}
                  <span className="">{link.label}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                {availableLinks.length === 0
                  ? "All social links have been added!"
                  : "No social links found."}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialLinksSelector;
