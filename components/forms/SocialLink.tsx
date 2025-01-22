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
  FaGlobe,
} from "react-icons/fa";
import { SiTiktok, SiViber } from "react-icons/si";

interface SocialLink {
  label: string;
  icon: React.ReactNode;
  key: string;
}

interface SocialLinksSelectorProps {
  onAddLink: (link: SocialLink) => void; // Callback to parent when a link is selected
}

const socialLinks: SocialLink[] = [
  { label: "Facebook", icon: <FaFacebook />, key: "facebook" },
  { label: "Website", icon: <FaGlobe />, key: "website" },
  { label: "Instagram", icon: <FaInstagram />, key: "instagram" },
  { label: "X (Twitter)", icon: <FaTwitter />, key: "twitter" },
  { label: "WhatsApp", icon: <FaWhatsapp />, key: "whatsapp" },
  { label: "Viber", icon: <SiViber />, key: "viber" },
  { label: "LinkedIn", icon: <FaLinkedin />, key: "linkedin" },
  { label: "YouTube", icon: <FaYoutube />, key: "youtube" },
  { label: "TikTok", icon: <SiTiktok />, key: "tiktok" },
];

const SocialLinksSelector: React.FC<SocialLinksSelectorProps> = ({
  onAddLink,
}) => {
  const [search, setSearch] = useState<string>("");
  const [availableLinks, setAvailableLinks] =
    useState<SocialLink[]>(socialLinks);

  const filteredLinks = availableLinks.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (link: SocialLink) => {
    onAddLink(link); // Notify parent of the selection
    setAvailableLinks((prev) => prev.filter((item) => item.key !== link.key)); // Remove from the list
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="mt-4">
          {availableLinks.length > 0 ? `+ Add Social Link` : "All Selected"}
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
            {filteredLinks.map((link) => (
              <div
                key={link.key}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-green-500"
                onClick={() => handleSelect(link)}
              >
                {link.icon}
                <span className="">{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialLinksSelector;
