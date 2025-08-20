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
  const socialLinks = [
    { url: facebookUrl, icon: FaFacebook, label: "Facebook" },
    { url: linkedinUrl, icon: FaLinkedin, label: "LinkedIn" },
    { url: instagramUrl, icon: FaInstagram, label: "Instagram" },
    { url: twitterUrl, icon: FaXTwitter, label: "Twitter" },
    { url: tiktokUrl, icon: FaTiktok, label: "TikTok" },
    { url: youtubeUrl, icon: FaYoutube, label: "YouTube" },
    { url: viberUrl, icon: FaViber, label: "Viber" },
    {
      url: whatsappNumber ? `https://wa.me/${whatsappNumber}` : null,
      icon: FaWhatsapp,
      label: "WhatsApp",
    },
    {
      url: skypeInviteUrl ? `skype:${skypeInviteUrl}?chat` : null,
      icon: FaSkype,
      label: "Skype",
    },
    { url: websiteUrl, icon: FaGlobe, label: "Website" },
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
