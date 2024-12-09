import { carouselCards } from "@/constants";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/zod-schema";
import { z } from "zod";

export type Users = {
  id?: string;
  coverPhotoUrl?: string;
  profilePictureUrl?: string;
  position?: string;
  company?: string;
  companyBackground?: string;
  serviceDescription?: string;
  servicePhotos?: string[];
  chosenTemplate?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  number?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  skypeInviteUrl?: string;
  websiteUrl?: string;
  printStatus?: boolean;
  userCode?: string;
  user_link?: string;
};

export type Notification = {
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timestamp: any;
  read?: boolean;
  userIds?: string[];
  broadcast?: boolean;
  excemptedUserIds?: string[];
  userIdsRead?: string[];
  actions?: "card/transfer";
  transactionId?: string;
};

export type Transaction = {
  type?: "card/transfer";
  transactionId: string;
  sender: string;
  verificationCode: string;
  receiver: string;
  timestamp: any;
  status: "pending" | "completed" | "failed";
};

export type Notifications = {
  id: string;
  data: Notification;
}[];

export interface ExtendedUserInterface extends Users {
  uid: string;
  role: string;
  onboarding: boolean;
}
export type UserState = ExtendedUserInterface | null;

export type Template = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  route: string;
};

export type SignedUserIdJwtPayload = {
  uid: string;
  iat: number;
  exp: number;
};

export interface Photo {
  preview: string;
  raw: File;
}

export interface Card extends Users {
  owner: string;
}

export interface CardItem {
  image: string;
  title: string;
  description: string;
  price: number;
}
export type CarouselCardKey = keyof typeof carouselCards;
export type CarouselCard = (typeof carouselCards)[CarouselCardKey];

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
