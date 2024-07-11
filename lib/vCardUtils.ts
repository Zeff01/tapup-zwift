// vCardUtils.ts

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  company: string;
  position: string;
  websiteUrl?: string;
};

export const downloadVCard = (userProfile: UserProfile) => {
  const { firstName, lastName, email, number, company, position, websiteUrl } =
    userProfile;

  if (!email) {
    console.error("No email available for vCard");
    return;
  }

  // Manually create vCard data
  let vCardString = "BEGIN:VCARD\n";
  vCardString += "VERSION:3.0\n";
  vCardString += `FN:${firstName} ${lastName}\n`;
  vCardString += `N:${lastName};${firstName};;;\n`;
  vCardString += `ORG:${company}\n`;
  vCardString += `TITLE:${position}\n`;
  vCardString += `TEL;TYPE=CELL:${number}\n`;
  vCardString += `EMAIL:${email}\n`;
  if (websiteUrl) {
    vCardString += `URL:${websiteUrl}\n`;
  }
  vCardString += "END:VCARD";

  // Create a Blob from the vCard String
  const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${firstName}_${lastName}_contact.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
