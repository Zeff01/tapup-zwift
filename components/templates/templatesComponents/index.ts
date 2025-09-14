export * from "./Container";
export * from "./CTAButtons";
export * from "./SocialLinks";
export * from "./ProfileHeader";
export * from "./TemplateFooter";

import { Card } from "@/types/types";

export const sampleCompanies = [
  {
    company: "Zwiftech Solutions",
    position: "Senior Developer",
    companyBackground:
      "A leading technology company specializing in innovative digital solutions. We help businesses transform their operations through cutting-edge software development and strategic consulting services.",
    serviceDescription:
      "We offer end-to-end software solutions tailored to your business needs, including web apps, mobile development, and custom integrations.",
    servicePhotos: ["/assets/sampleService.png", "/assets/sampleService.png"],
  },
];

export const getSampleSocialUrls = ({
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  websiteUrl,
  viberUrl,
}: Partial<Card>) => {
  return {
    facebookUrl: facebookUrl || "https://www.facebook.com",
    linkedinUrl: linkedinUrl || "https://www.linkedin.com",
    instagramUrl: instagramUrl || "https://www.instagram.com",
    twitterUrl: twitterUrl || "https://www.x.com",
    youtubeUrl: youtubeUrl || "https://www.youtube.com",
    websiteUrl: websiteUrl || "https://www.zwiftech.com",
    tiktokUrl: tiktokUrl || "https://www.tiktok.com",
    whatsappNumber: whatsappNumber || "https://www.whatsapp.com",
    viberUrl: viberUrl || "https://www.viber.com/en",
  };
};

export const samplePersonalInfo = {
  fullname: "Hussain Watkins",
  email: "hussain.watkins@zwiftech.com",
  number: "+63 912 345 6789",
};
