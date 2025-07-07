import { Card, Users } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { PixelCrop } from "react-image-crop";
import { twMerge } from "tailwind-merge";
import { getUserCardOrdering } from "./firebase/actions/user.action";
import { carouselCards } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUserLink = (userCode: string) => {
  try {
    if (!userCode) return "";
    const baseLink = window.location.origin;
    const user_link = `${baseLink}/user/${userCode}`;
    return user_link;
  } catch (error) {
    console.error("Error creating link: ", error);
    throw new Error("Error creating link");
  }
};

export const createCardLink = (cardId: string) => {
  try {
    if (!cardId) return "";
    const baseLink =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD
        : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV;
    const card_link = `${baseLink}/site/${cardId}`;
    return card_link;
  } catch (error) {
    console.error("Error creating link: ", error);
    throw new Error("Error creating link");
  }
};

export const isValidQRCode = (url: string) => {
  const devUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV + "/site/";
  const prodUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD + "/site/";
  return url.startsWith(devUrl) || url.startsWith(prodUrl);
};

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

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

export function catchErrorTyped<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>, undefined]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorsToCatch == undefined) {
        return [error, undefined] as [InstanceType<E>, undefined];
      }
      if (errorsToCatch.some((e) => error instanceof e)) {
        return [error, undefined] as [InstanceType<E>, undefined];
      }

      throw error;
    });
}

export function timeAgo(timestamp: Date): string {
  if (!timestamp) return "";
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - timestamp.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  return "just now";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  return date.toLocaleString(); // Uses the user's browser/system locale settings
}

export function getUserName(user: Users | undefined) {
  if (!user) return "N/A";

  const firstName = user.firstName ?? user.firstname ?? "";
  const lastName = user.lastName ?? user.lastname ?? "";

  const fullname = `${firstName} ${lastName}`.trim();

  if (fullname) return fullname;

  return "N/A";
}

// Sort cards based on the cardOrdering field from the user-account document
export async function sortCards(
  cards: Partial<Card>[],
  uid: string
): Promise<Card[]> {
  const ordering = await getUserCardOrdering(uid);

  if (!ordering) {
    return cards.filter((c): c is Card => !!c.id && !!c.owner); // return in original order (typed safely)
  }

  const cardMap = new Map(cards.map((card) => [card.id, card]));
  const sorted = ordering
    .map((id) => cardMap.get(id))
    .filter((card): card is Card => !!card?.id && !!card?.owner);

  const unordered = cards.filter(
    (c): c is Card => !!c.id && !!c.owner && !ordering.includes(c.id)
  );

  return [...sorted, ...unordered];
};

export const getCardImage = (cardId?: string) => {
  const cardItem =
    Object.values(carouselCards).find((item) => item.id === cardId) ??
    carouselCards[cardId as keyof typeof carouselCards];

  return cardItem ? cardItem.image : undefined;
};