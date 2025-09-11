import { Card } from "@/types/types";

/**
 * Generate vCard data string from user profile
 */
export const getVCardData = (user: Partial<Card>, qrScan?: boolean) => {
  const {
    id = "",
    prefix = "",
    firstName = "",
    middleName = "",
    lastName = "",
    suffix = "",
    email = "",
    number = "",
    company = "",
    position = "",
    websiteUrl = "",
    customUrl = "",
    facebookUrl = "",
    instagramUrl = "",
    linkedinUrl = "",
    twitterUrl = "",
    youtubeUrl = "",
    whatsappNumber = "",
    skypeInviteUrl = "",
    viberUrl = "",
    tiktokUrl = "",
  } = user;

  const portfolioUrl = customUrl ? customUrl : id;
  const cardUrl = `https://www.tapup.tech/cards/${id}`;

  if (!email) {
    console.error("No email available for vCard");
    return "";
  }

  const formattedName = [
    prefix && `${prefix}.`,
    firstName,
    middleName,
    lastName,
    suffix,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const vcardFields = [
    "BEGIN:VCARD",
    "VERSION:4.0",
    `FN:${formattedName}`,
    `N:${lastName};${firstName};${middleName};${prefix};${suffix}`,
    company && `ORG:${company}`,
    position && `TITLE:${position}`,
    number && `TEL;TYPE=cell:${number}`,
    `EMAIL;TYPE=work:${email}`,
    // portfolioUrl && `URL:https://www.tapup.tech/site/${portfolioUrl}`,
    // qrScan && `URL:${cardUrl}`,
    // portfolioUrl && `URL:https://www.tapup.tech/site/${portfolioUrl}`,
    // facebookUrl && `URL:${facebookUrl}\nNOTE:Facebook`,
    // instagramUrl && `URL:${instagramUrl}\nNOTE:Instagram`,
    // linkedinUrl && `URL:${linkedinUrl}\nNOTE:LinkedIn`,
    // twitterUrl && `URL:${twitterUrl}\nNOTE:Twitter`,
    // youtubeUrl && `URL:${youtubeUrl}\nNOTE:YouTube`,
    // tiktokUrl && `URL:${tiktokUrl}\nNOTE:TikTok`,
    // websiteUrl && `URL:${websiteUrl}`,
    // whatsappNumber && `IMPP:whatsapp:${whatsappNumber}`,
    // skypeInviteUrl && `IMPP:${skypeInviteUrl}`,
    // viberUrl && `IMPP:viber:${viberUrl}`,
    "END:VCARD",
  ];

  return vcardFields.filter(Boolean).join("\n");
};

/**
 * Download vCard file for a user profile
 */
export const downloadVCard = (userProfile: Partial<Card>) => {
  const vCardString = getVCardData(userProfile);

  if (!vCardString) return;

  const { firstName, lastName } = userProfile;
  // Create a Blob from the vCard String
  const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${firstName}_${lastName}_contact.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};