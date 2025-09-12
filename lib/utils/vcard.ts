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
    viberUrl = "",
    tiktokUrl = "",
    companies = [],
  } = user;

  // Generate the digital portfolio URL
  const digitalPortfolioUrl = customUrl 
    ? `https://www.tapup.tech/site/${customUrl}`
    : `https://www.tapup.tech/site/${id}`;

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

  // Get primary company info (either from companies array or fallback to single company fields)
  const primaryCompany = companies && companies.length > 0 
    ? companies[0] 
    : { company, position };
  
  // Build company/organization strings
  const orgStrings = [];
  if (primaryCompany.company) {
    orgStrings.push(`ORG:${primaryCompany.company}`);
  }
  if (primaryCompany.position) {
    orgStrings.push(`TITLE:${primaryCompany.position}`);
  }
  
  // Add additional companies as notes
  const additionalCompanies = companies && companies.length > 1 
    ? companies.slice(1).map((c, index) => 
        `NOTE:Company ${index + 2}: ${c.company || ''} - ${c.position || ''}`
      ).filter(note => note.includes(' - ') && !note.endsWith(' - '))
    : [];

  const vcardFields = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${formattedName}`,
    `N:${lastName};${firstName};${middleName};${prefix};${suffix}`,
    ...orgStrings,
    number && `TEL;TYPE=CELL:${number}`,
    `EMAIL;TYPE=WORK,INTERNET:${email}`,
    // Digital Portfolio URL (primary URL)
    `URL;TYPE=WORK:${digitalPortfolioUrl}`,
    // Social media URLs
    websiteUrl && `URL;TYPE=HOME:${websiteUrl}`,
    facebookUrl && `X-SOCIALPROFILE;TYPE=facebook:${facebookUrl}`,
    instagramUrl && `X-SOCIALPROFILE;TYPE=instagram:${instagramUrl}`,
    linkedinUrl && `X-SOCIALPROFILE;TYPE=linkedin:${linkedinUrl}`,
    twitterUrl && `X-SOCIALPROFILE;TYPE=twitter:${twitterUrl}`,
    youtubeUrl && `X-SOCIALPROFILE;TYPE=youtube:${youtubeUrl}`,
    tiktokUrl && `X-SOCIALPROFILE;TYPE=tiktok:${tiktokUrl}`,
    whatsappNumber && `TEL;TYPE=CELL,VOICE;PREF:${whatsappNumber}`,
    viberUrl && `X-SOCIALPROFILE;TYPE=viber:${viberUrl}`,
    // Add multiple companies as notes
    ...additionalCompanies,
    // Add a note about the digital portfolio
    `NOTE:View my digital portfolio at ${digitalPortfolioUrl}`,
    "END:VCARD",
  ];

  return vcardFields.filter(Boolean).join("\r\n");
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