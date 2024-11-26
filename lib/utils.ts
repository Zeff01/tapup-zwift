import { Card } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { PixelCrop } from "react-image-crop";
import { twMerge } from "tailwind-merge";

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

export const downloadVCard = (userProfile: Partial<Card>) => {
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
