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

interface ColorfulColors {
  facebook?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  instagram?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  linkedin?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  twitter?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  youtube?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  tiktok?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  whatsapp?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  viber?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  skype?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
  website?: {
    icon?: string;
    background?: string;
    hover?: { icon?: string; background?: string };
  };
}

interface SocialLinksProps {
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  whatsappNumber: string;
  viberUrl: string;
  skypeInviteUrl: string;
  websiteUrl: string;
  variant?: "default" | "buttons" | "minimal" | "colorful";
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
  layout?: "horizontal" | "vertical" | "grid";
  showLabels?: boolean;
  iconSet?: "default" | "outline" | "solid";
  colorfulColors?: ColorfulColors;
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

// Default brand colors for colorful variant
const defaultColorfulColors: ColorfulColors = {
  facebook: {
    icon: "#ffffff",
    background: "#1877F2",
    hover: { icon: "#ffffff", background: "#166FE5" },
  },
  instagram: {
    icon: "#ffffff",
    background:
      "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
    hover: {
      icon: "#ffffff",
      background:
        "linear-gradient(45deg, #3949D1, #4A46C6, #7530A0, #B02C77, #CC2C60, #E81818)",
    },
  },
  linkedin: {
    icon: "#ffffff",
    background: "#0A66C2",
    hover: { icon: "#ffffff", background: "#095BA8" },
  },
  twitter: {
    icon: "#ffffff",
    background: "#000000",
    hover: { icon: "#ffffff", background: "#1a1a1a" },
  },
  youtube: {
    icon: "#ffffff",
    background: "#FF0000",
    hover: { icon: "#ffffff", background: "#E60000" },
  },
  tiktok: {
    icon: "#ffffff",
    background: "#000000",
    hover: { icon: "#ffffff", background: "#1a1a1a" },
  },
  whatsapp: {
    icon: "#ffffff",
    background: "#25D366",
    hover: { icon: "#ffffff", background: "#21C05C" },
  },
  viber: {
    icon: "#ffffff",
    background: "#665CAC",
    hover: { icon: "#ffffff", background: "#5B5299" },
  },
  skype: {
    icon: "#ffffff",
    background: "#00AFF0",
    hover: { icon: "#ffffff", background: "#009ED6" },
  },
  website: {
    icon: "#ffffff",
    background: "#6B7280",
    hover: { icon: "#ffffff", background: "#5F6368" },
  },
};

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

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
  colorfulColors,
}) => {
  const icons = iconSets[iconSet];
  const iconSize = sizeMap[size];
  const colors = { ...defaultColorfulColors, ...colorfulColors };

  const layoutClasses = {
    horizontal: "flex items-center gap-2 flex-wrap justify-center",
    vertical: "flex flex-col gap-3",
    grid: "grid grid-cols-3 gap-3",
  };

  const getContainerClasses = () => {
    return cn(layoutClasses[layout], className);
  };

  const getIconClasses = (platform?: keyof ColorfulColors) => {
    const baseClasses = "transition-all duration-200 ";

    switch (variant) {
      case "buttons":
        return cn(iconClassName, baseClasses, "rounded-full p-2");
      case "minimal":
        return cn(
          baseClasses,
          "text-gray-600 hover:text-gray-900",
          iconClassName
        );
      case "colorful":
        if (platform && colors[platform]) {
          return cn(baseClasses, iconClassName);
        }
        return cn(baseClasses, iconClassName);
      default:
        return cn(baseClasses, iconClassName);
    }
  };

  const getColorfulStyle = (platform: keyof ColorfulColors) => {
    if (variant !== "colorful" || !colors[platform]) return {};

    const platformColors = colors[platform]!;
    return {
      color: platformColors.icon,
      background: platformColors.background,
      transition: "all 0.2s ease",
    };
  };

  const getColorfulHoverStyle = (platform: keyof ColorfulColors) => {
    if (variant !== "colorful" || !colors[platform]?.hover) return {};

    const hoverColors = colors[platform]!.hover!;
    return {
      color: hoverColors.icon,
      background: hoverColors.background,
    };
  };

  const renderSocialLink = (
    url: string | undefined,
    Icon: React.ComponentType<{ size?: number; className?: string }>,
    label: string,
    platform: keyof ColorfulColors,
    href?: string
  ) => {
    if (!url) return null;

    const linkHref = href || url;
    const iconClass = getIconClasses(platform);
    const style = getColorfulStyle(platform);
    const hoverStyle = getColorfulHoverStyle(platform);

    if (variant === "buttons" || variant === "colorful") {
      return (
        <Button
          key={label}
          className={cn(
            "rounded-full w-auto h-auto p-2 border-0",
            variant === "colorful" && "hover:scale-105 transform"
          )}
          style={style}
          asChild
          onMouseEnter={(e) => {
            if (variant === "colorful" && Object.keys(hoverStyle).length > 0) {
              Object.assign(e.currentTarget.style, hoverStyle);
            }
          }}
          onMouseLeave={(e) => {
            if (variant === "colorful") {
              Object.assign(e.currentTarget.style, style);
            }
          }}
        >
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
      {renderSocialLink(facebookUrl, icons.facebook, "Facebook", "facebook")}
      {renderSocialLink(
        instagramUrl,
        icons.instagram,
        "Instagram",
        "instagram"
      )}
      {renderSocialLink(linkedinUrl, icons.linkedin, "LinkedIn", "linkedin")}
      {renderSocialLink(twitterUrl, icons.twitter, "Twitter", "twitter")}
      {renderSocialLink(youtubeUrl, icons.youtube, "YouTube", "youtube")}
      {renderSocialLink(tiktokUrl, icons.tiktok, "TikTok", "tiktok")}
      {renderSocialLink(
        whatsappNumber,
        icons.whatsapp,
        "WhatsApp",
        "whatsapp",
        `https://wa.me/${whatsappNumber}`
      )}
      {renderSocialLink(viberUrl, icons.viber, "Viber", "viber", viberUrl)}
      {renderSocialLink(
        skypeInviteUrl,
        icons.skype,
        "Skype",
        "skype",
        `skype:${skypeInviteUrl}?chat`
      )}
      {renderSocialLink(websiteUrl, icons.website, "Website", "website")}
    </div>
  );
};

// Pre-configured variants for templates
export const Template1Socials: React.FC<Omit<SocialLinksProps, "variant">> = (
  props
) => <SocialLinks {...props} variant="default" iconClassName="text-gray-900" />;

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
    className="flex gap-3 justify-start"
  />
);

// Example colorful variants for different components
export const Component1Socials: React.FC<
  Omit<SocialLinksProps, "variant" | "colorfulColors">
> = (props) => (
  <SocialLinks
    {...props}
    variant="colorful"
    colorfulColors={{
      facebook: {
        icon: "#ffffff",
        background: "#4267B2",
        hover: { icon: "#ffffff", background: "#365899" },
      },
      instagram: {
        icon: "#ffffff",
        background:
          "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        hover: {
          icon: "#ffffff",
          background:
            "linear-gradient(45deg, #d17f2b 0%,#c55a32 25%,#b91f39 50%,#a91d5a 75%,#9b1477 100%)",
        },
      },
      linkedin: {
        icon: "#ffffff",
        background: "#0077B5",
        hover: { icon: "#ffffff", background: "#005885" },
      },
    }}
  />
);

export const Component2Socials: React.FC<
  Omit<SocialLinksProps, "variant" | "colorfulColors">
> = (props) => (
  <SocialLinks
    {...props}
    variant="colorful"
    colorfulColors={{
      facebook: {
        icon: "#4267B2",
        background: "#f0f2f5",
        hover: { icon: "#ffffff", background: "#4267B2" },
      },
      instagram: {
        icon: "#E1306C",
        background: "#fafafa",
        hover: {
          icon: "#ffffff",
          background:
            "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        },
      },
      linkedin: {
        icon: "#0077B5",
        background: "#f3f6f8",
        hover: { icon: "#ffffff", background: "#0077B5" },
      },
    }}
  />
);
