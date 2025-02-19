types/types.d.ts


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
  chosenPhysicalCard?: string;
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

export interface DeliveryOption {
  name?: string;
  image?: string;
  shippingFee: number;
  minDays?: number;
  maxDays?: number;
}
export interface CartItem {
  product: CardItem;
  quantity: number;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  deliveryOption: DeliveryOption;
  orderDate: Date;
  totalAmount: number;
  requiresInfo?: boolean;
  status: "Pending" | "To Ship" | "To Receive" | "Delivered" | "To Return/Refund"| "Cancelled";
  returnStatus?: "Return Requested" | "To Return" | "Refunded" | "Delivered" | "Return Rejected" | "Cancelled";
}

export interface Address {
  city: string;
  street: string;
  unit: string;
  postalCode: string;
}

export interface ShippingInfo {
  recipientName: string;
  contactNumber: string;
  address: Address;
}

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
  status?: "disabled",
}

export interface PhysicalCardProps extends Card {
  frontBackgroundImage?: StaticImageData;
  backBackgroundImage?: StaticImageData;
}

export interface CardItem {
  id: string;
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

export type TapItemprops = {
  date: string; // ISO date string
  todayCount?: number | undefined;
  weekCount?: number;
  monthCount?: number;
  total: number;
  company: string;
  position: string;
  companyImage: string;
  name?: string;
};

export type BillingHistoryItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
};
