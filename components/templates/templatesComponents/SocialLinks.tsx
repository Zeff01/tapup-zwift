import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaTiktok,
  FaViber,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import { SiSkypeforbusiness, SiTiktok, SiViber } from "react-icons/si";
import { SlSocialFacebook } from "react-icons/sl";

interface SocialLinksProps {
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  whatsappNumber?: string;
  viberUrl?: string;
  skypeInviteUrl?: string;
  websiteUrl?: string;
  variant?: "default" | "buttons" | "minimal" | "colorful";
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
  layout?: "horizontal" | "vertical" | "grid";
  showLabels?: boolean;
  iconSet?: "default" | "outline" | "solid";
}

const iconSets = {
  default: {
    facebook: FaFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    whatsapp: FaWhatsapp,
    viber: FaViber,
    skype: FaSkype,
    website: FaGlobe,
  },
  outline: {
    facebook: SlSocialFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    youtube: FiYoutube,
    tiktok: SiTiktok,
    whatsapp: FaWhatsapp,
    viber: SiViber,
    skype: SiSkypeforbusiness,
    website: GoGlobe,
  },
  solid: {
    facebook: FaFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    whatsapp: FaWhatsapp,
    viber: FaViber,
    skype: FaSkype,
    website: FaGlobe,
  },
};

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

const socialLinks = [
  { key: "facebook", prop: "facebookUrl", label: "Facebook" },
  { key: "instagram", prop: "instagramUrl", label: "Instagram" },
  { key: "linkedin", prop: "linkedinUrl", label: "LinkedIn" },
  { key: "twitter", prop: "twitterUrl", label: "Twitter" },
  { key: "youtube", prop: "youtubeUrl", label: "YouTube" },
  { key: "tiktok", prop: "tiktokUrl", label: "TikTok" },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  twitterUrl,
  youtubeUrl,
  tiktokUrl,
  whatsappNumber,
  viberUrl,
  skypeInviteUrl,
  websiteUrl,
  variant = "default",
  size = "md",
  className,
  iconClassName,
  layout = "horizontal",
  showLabels = false,
  iconSet = "default",
}) => {
  const icons = iconSets[iconSet];
  const iconSize = sizeMap[size];

  const layoutClasses = {
    horizontal: "flex items-center gap-2  flex-wrap justify-center",
    vertical: "flex flex-col gap-3",
    grid: "grid grid-cols-3 gap-3",
  };

  const getContainerClasses = () => {
    return cn(layoutClasses[layout], className);
  };

  const getIconClasses = () => {
    const baseClasses = "transition-all duration-200 ";

    switch (variant) {
      case "buttons":
        return cn(baseClasses, "rounded-full p-2", iconClassName);
      case "minimal":
        return cn(
          baseClasses,
          "text-gray-600 hover:text-gray-900",
          iconClassName
        );
      case "colorful":
        return cn(baseClasses, iconClassName);
      default:
        return cn(baseClasses, iconClassName);
    }
  };

  const renderSocialLink = (
    url: string | undefined,
    Icon: React.ComponentType<{ size?: number; className?: string }>,
    label: string,
    href?: string
  ) => {
    if (!url) return null;

    const linkHref = href || url;
    const iconClass = getIconClasses();

    if (variant === "buttons") {
      return (
        <Button key={label} className="rounded-full w-auto h-auto p-2" asChild>
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
          >
            <Icon size={iconSize} />
          </a>
        </Button>
      );
    }

    return (
      <a
        key={label}
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-2",
          showLabels && "hover:underline"
        )}
        title={label}
      >
        <Icon size={iconSize} className={iconClass} />
        {showLabels && <span className="text-sm">{label}</span>}
      </a>
    );
  };

  return (
    <div className={getContainerClasses()}>
      {renderSocialLink(facebookUrl, icons.facebook, "Facebook")}
      {renderSocialLink(instagramUrl, icons.instagram, "Instagram")}
      {renderSocialLink(linkedinUrl, icons.linkedin, "LinkedIn")}
      {renderSocialLink(twitterUrl, icons.twitter, "Twitter")}
      {renderSocialLink(youtubeUrl, icons.youtube, "YouTube")}
      {renderSocialLink(tiktokUrl, icons.tiktok, "TikTok")}
      {renderSocialLink(
        whatsappNumber,
        icons.whatsapp,
        "WhatsApp",
        `https://wa.me/${whatsappNumber}`
      )}
      {renderSocialLink(viberUrl, icons.viber, "Viber", viberUrl)}
      {renderSocialLink(
        skypeInviteUrl,
        icons.skype,
        "Skype",
        `skype:${skypeInviteUrl}?chat`
      )}
      {renderSocialLink(websiteUrl, icons.website, "Website")}
    </div>
  );
};

// Pre-configured variants for templates
export const Template1Socials: React.FC<Omit<SocialLinksProps, "variant">> = (
  props
) => (
  <SocialLinks
    {...props}
    variant="default"
    iconClassName="text-gray-600 hover:text-gray-900"
  />
);

export const Template7Socials: React.FC<Omit<SocialLinksProps, "variant">> = (
  props
) => <SocialLinks {...props} variant="buttons" />;

export const Template9Socials: React.FC<Omit<SocialLinksProps, "variant">> = (
  props
) => (
  <SocialLinks {...props} variant="default" iconClassName="text-neutral-700" />
);

export const Template13Socials: React.FC<Omit<SocialLinksProps, "variant">> = (
  props
) => (
  <SocialLinks
    {...props}
    variant="default"
    iconClassName="text-white hover:text-gray-300"
    className="flex items-center gap-6"
  />
);
