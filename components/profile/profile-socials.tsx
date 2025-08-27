import { Card } from "@/types/types";
import Link from "next/link";
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
import { getSampleSocialUrls } from "../templates/templatesComponents";

const SocialIcon = ({
  url,
  icon: Icon,
  label,
}: {
  url: string;
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm border border-gray-100 transition-transform hover:scale-110 hover:shadow-md group"
      aria-label={label}
    >
      <Icon
        className="text-gray-700 group-hover:text-blue-600 transition-colors"
        size={18}
      />
    </Link>
  );
};

const ProfileSocials = ({
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
}: Partial<Card>) => {
  const sampleSocials = getSampleSocialUrls({
    facebookUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    tiktokUrl,
    youtubeUrl,
    whatsappNumber,
    skypeInviteUrl,
    websiteUrl,
    viberUrl,
  });

  const socialLinks = [
    {
      url: facebookUrl || sampleSocials.facebookUrl,
      icon: FaFacebook,
      label: "Facebook",
    },
    {
      url: linkedinUrl || sampleSocials.linkedinUrl,
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      url: instagramUrl || sampleSocials.instagramUrl,
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      url: twitterUrl || sampleSocials.twitterUrl,
      icon: FaXTwitter,
      label: "Twitter",
    },
    {
      url: tiktokUrl || sampleSocials.tiktokUrl,
      icon: FaTiktok,
      label: "TikTok",
    },
    {
      url: youtubeUrl || sampleSocials.youtubeUrl,
      icon: FaYoutube,
      label: "YouTube",
    },
    { url: viberUrl || sampleSocials.viberUrl, icon: FaViber, label: "Viber" },
    {
      url: whatsappNumber || sampleSocials.whatsappNumber,
      icon: FaWhatsapp,
      label: "WhatsApp",
    },
    {
      url: skypeInviteUrl || sampleSocials.skypeInviteUrl,
      icon: FaSkype,
      label: "Skype",
    },
    {
      url: websiteUrl || sampleSocials.websiteUrl,
      icon: FaGlobe,
      label: "Website",
    },
  ].filter((link) => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <section className="px-1 py-1 mt-2">
      <div className="flex flex-wrap gap-1">
        {socialLinks.map((link, index) => (
          <SocialIcon
            key={index}
            url={link.url as string}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfileSocials;
