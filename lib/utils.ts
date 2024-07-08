import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
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

// export const createPortfolioSchema = z.object({
//   coverPhotoUrl: z.string().url().optional(),
//   profilePictureUrl: z.string().url(),
//   position: z.string().min(3, "Position is required"),
//   company: z.string().min(3, "Company name is required"),
//   companyBackground: z
//     .string()
//     .min(3, "Company background is required")
//     .optional(),
//   serviceDescription: z
//     .string()
//     .min(3, "Service description is required")
//     .optional(),
//   servicePhotos: z.array(z.string().url()).optional(),
//   chosenTemplate: z.enum(["template1", "template2", "template3"]),
//   firstName: z.string().min(3, "First name must be at least 3 characters"),
//   lastName: z.string().min(3, "Last name must be at least 3 characters"),
//   email: z.string().email("Invalid email address"),
//   number: z.string().min(10, "Phone number must be at least 10 digits"),
//   facebookUrl: z.string().url().optional(),
//   youtubeUrl: z.string().url().optional(),
//   instagramUrl: z.string().url().optional(),
//   twitterUrl: z.string().url().optional(),
//   linkedinUrl: z.string().url().optional(),
//   whatsappUrl: z.string().url().optional(),
//   skypeUrl: z.string().url().optional(),
//   websiteUrl: z.string().url().optional(),
// });

export const createPortfolioSchema = z.object({
  coverPhotoUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  profilePictureUrl: z.string().url(), // Profile picture URL is required
  position: z.string().min(3, "Position is required"),
  company: z.string().min(3, "Company name is required"),
  companyBackground: z
    .string()
    .min(3, "Company background is required")
    .optional(),
  serviceDescription: z
    .string()
    .min(3, "Service description is required")
    .optional(),
  servicePhotos: z.array(z.string().url()).optional(),
  chosenTemplate: z.enum(["template1", "template2", "template3"]),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  facebookUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
      // specify the field path for error
    })
    .optional(),
  youtubeUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  instagramUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  twitterUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  linkedinUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  whatsappUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  skypeUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
  websiteUrl: z
    .string()
    .refine((value) => value === "" || /^https?:\/\/[^ "]+$/.test(value), {
      message: "Invalid URL",
    })
    .optional(),
});
