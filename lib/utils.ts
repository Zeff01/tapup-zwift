import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUserLink = (userCode: string) => {
  try {
    if (!userCode) return "";
    const user_link = `${process.env.NEXT_PUBLIC_BASE_LINK}/users/${userCode}`;
    return user_link;
  } catch (error) {
    console.error("Error creating link: ", error);
    throw new Error("Error creating link");
  }
};

const refinePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim() === "") {
    return true; // Allow empty string
  }
  return isValidPhoneNumber(phoneNumber);
};

export const createPortfolioSchema = z.object({
  coverPhotoUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Coverphoto URL",
      }
    )
    .optional(),
  profilePictureUrl: z
    .string()
    .min(3, "Profile Picture is required")
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Coverphoto URL",
      }
    ), // Profile picture URL is required
  position: z.string().min(3, "Position is required"),
  company: z.string().min(3, "Company name is required"),
  companyBackground: z.string().min(3, "Company background is required").optional(),
  serviceDescription: z.string().min(3, "Service description is required").optional(),
  servicePhotos: z.array(z.string().url()).optional(),
  chosenTemplate: z.enum(["template1", "template2", "template3", "template4", "template5"]),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  number: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  facebookUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
        // specify the field path for error
      }
    )
    .optional(),
  youtubeUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  instagramUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  twitterUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  linkedinUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  whatsappNumber: z
    .string()
    .refine(refinePhoneNumber, { message: "Invalid phone number" })
    .optional(),
  skypeInviteUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^(?:https?:\/\/)?(?:join\.skype\.com\/invite\/[a-zA-Z0-9_-]+)$/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  websiteUrl: z
    .string()
    .refine(
      (value) => value === "" || /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
});
