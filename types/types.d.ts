import { carouselCards } from "@/constants";

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/zod-schema";
import { Timestamp } from "firebase/firestore";
import { FieldValue } from "react-hook-form";

import { z } from "zod";

export type Company = {
  company?: string;
  position?: string;
  companyBackground?: string;
  serviceDescription?: string;
  servicePhotos?: string[];
};

export type Users = {
  id?: string;
  coverPhotoUrl?: string;
  profilePictureUrl?: string;
  position?: string;
  companies: Company[];
  company?: string;
  companyBackground?: string;
  serviceDescription?: string;
  servicePhotos?: string[];
  chosenTemplate?: string;
  chosenPhysicalCard?: string;
  customUrl?: string; // added for multi-step-form, not really sure
  cardName?: string;
  firstName?: string;
  lastName?: string;
  prefix?: string;
  suffix?: string;
  middleName?: string;
  firstname?: string; // temporary
  lastname?: string; // temporary
  email: string;
  number?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  tiktokUrl?: string;
  viberUrl?: string;
  printStatus?: boolean;
  userCode?: string;
  user_link?: string;
};

export interface DeliveryOption {
  name: string;
  image: string;
  shippingFee: number;
  minDays: number;
  maxDays: number;
}
export interface CartItem {
  physicalCardId: string;
  product: CardItem;
  quantity: number;
  subscriptionPlan: SubscriptionPlan | null;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  deliveryOption: DeliveryOption;
  orderDate: Date;
  totalAmount: number;
  requiresInfo?: boolean;
  status:
    | "Pending"
    | "To Ship"
    | "To Receive"
    | "Delivered"
    | "To Return/Refund"
    | "Cancelled";
  returnStatus?:
    | "Return Requested"
    | "To Return"
    | "Refunded"
    | "Delivered"
    | "Return Rejected"
    | "Cancelled";
  // Cancellation fields
  cancelledAt?: Date;
  cancelReason?: string;
  cancelledBy?: string;
  // Refund fields
  refundStatus?: "Pending" | "Processing" | "Completed" | "Rejected";
  refundRequestedAt?: Date;
  refundCompletedAt?: Date;
  refundAmount?: number;
  refundReason?: string;
  refundMethod?: string;
  refundTransactionId?: string;
  paymentMethod?: string;
  userId?: string;
  // Payment continuation fields
  paymentUrl?: string;
  xenditPlanId?: string;
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

export type UserRole = "super_admin" | "admin" | "user";

export interface ExtendedUserInterface extends Users {
  uid: string;
  role: UserRole;
  onboarding: boolean;
  deliveryAddresses?: DeliveryAddress[];
  cardOrdering?: string[];
  cardCount?: number;
  timestamp?: string;
  updatedAt?: string;
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
  transferCode: string;
  expiryDate?: number;
  disabled?: boolean;
  customUrl?: string;
  chosenPhysicalCard?: {
    id: string;
    name?: string;
  };
  subscription_id?: string;
  createdAt: Timestamp | FieldValue;
  portfolioStatus?: boolean;
}

export interface DeliveryAddress {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
  // New Philippines address fields
  country?: string;
  regionCode?: string;
  regionName?: string;
  provinceCode?: string;
  provinceName?: string;
  cityCode?: string;
  cityName?: string;
  barangay?: string;
}

export interface CardItemTransactionBoard {
  id: string;
  name: string;
  quantity: number;
  imageUrl?: string;
}

export interface ReceiverTransactionBoard {
  customerAddress: string;
  customerEmail: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
}

export interface TransactionBoard {
  id: string;
  amount: number;
  cards: CardItemTransactionBoard[];
  createdAt: Timestamp | FieldValue | string;
  receiver: ReceiverTransactionBoard;
  status: "pending" | "completed" | "cancelled" | "processing";
}

export type GenericCardType = {
  id: string;
  name: string;
};

export type GenericCard = {
  transferCode: string;
  chosenPhysicalCard: GenericCardType;
  createdAt: Timestamp | FieldValue;
  printStatus: boolean;
};

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

type CustomerType = {
  reference_id: string; // Required: Unique merchant-provided identifier
  mobile_number?: string; // Optional: Mobile number in E.164 format
  email?: string; // Optional: Email address of the customer
  type: "INDIVIDUAL" | "BUSINESS"; // Required: Type of customer
  individual_detail: {
    given_names: string; // Required: First name(s) of the individual
    surname?: string; // Optional: Last name
    middle_name?: string; // Optional: Middle name
  };
};

export type CreateInvoiceType = {
  external_id: string; // Required: Unique identifier for the invoice
  amount: number; // Required: Invoice amount (inclusive of fees/items)
  description?: string; // Optional: Description of the invoice
  invoice_duration?: number; // Optional: Duration before expiration (in seconds)
  customer?: {
    given_names?: string;
    surname?: string;
    email?: string;
    mobile_number?: string;
    addresses?: {
      city?: string;
      country: string;
      postal_code?: string;
      state?: string;
      street_line1?: string;
      street_line2?: string;
    }[];
  };
  customer_notification_preference?: {
    invoice_created?: ("whatsapp" | "email" | "viber")[];
    invoice_reminder?: ("whatsapp" | "email" | "viber")[];
    invoice_paid?: ("whatsapp" | "email" | "viber")[];
  };
  success_redirect_url?: string; // Optional: URL after successful payment
  failure_redirect_url?: string; // Optional: URL after failed/expired invoice
  payment_methods?: string[]; // Optional: Available payment methods
  currency?: "IDR" | "PHP" | "THB" | "VND" | "MYR"; // Optional: Invoice currency
  callback_virtual_account_id?: string; // Optional: ID for fixed virtual account
  mid_label?: string; // Optional: Merchant MID label
  reminder_time_unit?: "days" | "hours"; // Optional: Unit for reminder_time
  reminder_time?: number; // Optional: Reminder before expiration
  locale?: "en" | "id"; // Optional: Language for invoice UI
  items?: {
    name: string;
    quantity: number;
    price: number;
    category?: string;
    url?: string;
  }[]; // Optional: List of items (required for PayLater)
  fees?: {
    type: string;
    value: number;
  }[]; // Optional: Extra fees (admin, shipping, tax, etc.)
  should_authenticate_credit_card?: boolean; // Optional: Force 3DS authentication for cards
  channel_properties?: {
    cards?: {
      allowed_bins?: string[];
      installment_configuration?: {
        allow_installment: boolean;
        allow_full_payment: boolean;
        allowed_terms?: {
          issuer: string;
          terms: number[];
        }[];
      };
    };
  };
  metadata?: Record<string, any>; // Optional: Custom metadata (up to 50 keys)
};

type Subscription = {
  id: string; // Document ID
  cardId: string;
  dateAvailed: number; // Timestamp (when subscription is active)
  subscriptionDays: number; // Duration in days
};

type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features: string[];
};

export type RecurringPlanType = {
  reference_id: string;
  customer_id: string;
  recurring_action: "PAYMENT";
  currency: "IDR" | "PHP";
  amount: number;
  schedule: {
    reference_id: string;
    interval: "DAY" | "WEEK" | "MONTH";
    interval_count: number;
    total_recurrence?: number;
    anchor_date?: string; // ISO 8601 Timestamp
    retry_interval?: "DAY";
    retry_interval_count?: number;
    total_retry?: number; // Min 1, Max 10
    failed_attempt_notifications?: number[];
  };
  notification_config?: {
    locale?: "en" | "id";
    recurring_created?: ("WHATSAPP" | "EMAIL")[];
    recurring_succeeded?: ("WHATSAPP" | "EMAIL")[];
    recurring_failed?: ("WHATSAPP" | "EMAIL")[];
  };
  failed_cycle_action?: "RESUME" | "STOP";
  immediate_action_type?: "FULL_AMOUNT";
  metadata?: Record<string, unknown> | null;
  description?: string;
  success_return_url?: string;
  failure_return_url?: string;
  items?: {
    type:
      | "DIGITAL_PRODUCT"
      | "PHYSICAL_PRODUCT"
      | "DIGITAL_SERVICE"
      | "PHYSICAL_SERVICE"
      | "FEE"
      | "DISCOUNT";
    name: string;
    net_unit_amount: number;
    quantity: number;
    url?: string;
    category?: string;
    subcategory?: string;
    description?: string;
    metadata?: Record<string, unknown>;
  }[];
};

export type TransactionType = {
  id?: string;
  receiver: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
  };
  cards: {
    id: string;
    name: string;
  }[];
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt?: Timestamp | FieldValue;
  user_id?: string;
};
