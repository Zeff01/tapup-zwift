import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const refinePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim() === "") {
    return true; // Allow empty string
  }
  return isValidPhoneNumber(phoneNumber);
};

export const companySchema = z.object({
  company: z.string().optional(),

  position: z.string().optional(),

  companyBackground: z.string().optional(),

  serviceDescription: z.string().optional(),

  servicePhotos: z
    .array(
      z.string().url({ message: "Each service photo must be a valid URL." })
    )
    .optional(),
});

export const createPortfolioSchema = z.object({
  coverPhotoUrl: z
    .string()
    .min(3, "Cover Photo is required")
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Coverphoto URL",
      }
    )
    .optional(),
  profilePictureUrl: z
    .string()
    .min(3, "Profile Picture is required")
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Coverphoto URL",
      }
    ), // Profile picture URL is required
  position: z.string().min(3, "Position is required"),
  companies: z.array(companySchema).default([]).optional(), // allows for multiple companies
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
  chosenTemplate: z.enum([
    "template1",
    "template2",
    "template3",
    "template4",
    "template5",
    "template6",
    "template7",
    "template8",
    "template9",
    "template10",
    "template11",
    "template12",
    "template13",
    "template14",
    "template15",
    "template16",
    "template17",
    "template18",
  ]),
  chosenPhysicalCard: z.enum(["card1", "card2", "card3", "card4"]),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  middleName: z.string().optional(),
  email: z.string(),
  number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  facebookUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
        // specify the field path for error
      }
    )
    .optional(),
  youtubeUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  instagramUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  twitterUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  linkedinUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
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
        /^(?:https?:\/\/)?(?:join\.skype\.com\/invite\/[a-zA-Z0-9_-]+)$/.test(
          value
        ),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  websiteUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
});

export const editCardSchema = z.object({
  coverPhotoUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Coverphoto URL",
      }
    )
    .optional(),
  profilePictureUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid Profile Picture URL",
      }
    )
    .optional(),
  position: z.string().optional(),
  companies: z.array(companySchema).default([]).optional(), // allows for multiple companies
  company: z.string().optional(),
  companyBackground: z.string().optional(),
  serviceDescription: z.string().optional(),
  servicePhotos: z.array(z.string().url()).optional(),
  chosenTemplate: z
    .enum([
      "template1",
      "template2",
      "template3",
      "template4",
      "template5",
      "template6",
      "template7",
      "template8",
      "template9",
      "template10",
      "template11",
      "template12",
      "template13",
      "template14",
      "template15",
      "template16",
      "template17",
      "template18",
    ])
    .optional(),
  chosenPhysicalCard: z
    .enum([
      "card1",
      "card2",
      "card3",
      "card4",
      "card5",
      "card6",
      "card7",
      "card8",
      "card9",
      "card10",
      "card11",
    ])
    .optional(),
  customUrl: z
    .string()
    .optional()
    .refine((value) => {
      if (value) {
        const pathRegex = /^[a-zA-Z0-9-_]+$/;
        return pathRegex.test(value);
      }
      return true;
    }, "Custom URL can only contain letters, numbers, hyphens, and underscores."),
  cardName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  middleName: z.string().optional(),
  number: z
    .string()
    .refine(refinePhoneNumber, { message: "Invalid phone number" })
    .optional(),

  facebookUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://facebook.com/") ||
        value.startsWith("https://www.facebook.com/"),
      {
        message: "Must be a valid Facebook URL",
      }
    )
    .optional(),

  youtubeUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://youtube.com/") ||
        value.startsWith("https://www.youtube.com/"),
      {
        message: "Must be a valid YouTube URL",
      }
    )
    .optional(),

  instagramUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://instagram.com/") ||
        value.startsWith("https://www.instagram.com/"),
      {
        message: "Must be a valid Instagram URL",
      }
    )
    .optional(),

  twitterUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://twitter.com/") ||
        value.startsWith("https://x.com/"),
      {
        message: "Must be a valid Twitter/X URL",
      }
    )
    .optional(),

  linkedinUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://linkedin.com/") ||
        value.startsWith("https://www.linkedin.com/"),
      {
        message: "Must be a valid LinkedIn URL",
      }
    )
    .optional(),

  tiktokUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://tiktok.com/") ||
        value.startsWith("https://www.tiktok.com/"),
      {
        message: "Must be a valid TikTok URL",
      }
    )
    .optional(),

  viberUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        value.startsWith("https://viber.com/") ||
        value.startsWith("https://www.viber.com/"),
      {
        message: "Must be a valid Viber URL",
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
        /^https:\/\/join\.skype\.com\/[a-zA-Z0-9_-]+$/.test(value),
      {
        message: "Must be a valid Skype invite URL",
      }
    )
    .optional(),
  websiteUrl: z
    .string()
    .refine(
      (value) => value === "" || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value),
      {
        message: "Must be a valid website URL",
      }
    )
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(3, { message: "Must be at least 3 characters " }),
    lastName: z.string().min(2, { message: "Must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .nonempty("Card number is required")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number format"),
  expiryDate: z
    .string()
    .nonempty("Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, "Invalid expiry date format"),
  cvv: z.string().nonempty("CVV is required").length(3, "CVV must be 3 digits"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  zipCode: z.string().nonempty("Zip code is required"),
  agree: z
    .boolean()
    .refine((val) => val === true, "You must agree with the payment policy"),
});

export const deliveryFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  street: z.string().min(5, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(1, { message: "Please select a country" }),
  state: z.string().min(1, { message: "Please select a state/province" }),
  zipCode: z.string().min(1, { message: "Postal/ZIP code is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
});
