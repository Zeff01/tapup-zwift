import { CardItem } from "@/types/types";
import {
  ArrowUp,
  Circle,
  Clock4,
  CreditCard,
  Image,
  LayoutDashboard,
  Package,
  PackageCheck,
  RectangleHorizontal,
  Text,
  Triangle,
  Truck,
  Undo2,
  X,
  Users,
  Home,
  Receipt,
} from "lucide-react";

import { RxDashboard } from "react-icons/rx";
import { TbCards } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";

export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const RESET_PASSWORD_ROUTE = "/resetPassword";
export const FORGOT_PASSWORD_ROUTE = "/forgotPassword";
export const SESSION_COOKIE_NAME = "user_session";
export const ONBOARDING_ROUTE = "/onboarding";
export const HOME_ROUTE = "/home";
export const DASHBOARD_ROUTE = "/cards";
export const ADMIN_ONLY_ROUTE = "/users";
export const CARD_ROUTE = "/cards";
export const USER_ROUTE = "/users";
export const UPDATE_ROUTE = "/user/update";
export const ACTION_ROUTE = "/action";
export const CARD_PATH = "/cards/:path*";
export const ADMIN_ONLY_PATH = "/users/:path*";
export const UPDATE_PATH = "/user/update/:path*";
export const ONBOARDING_PATH = "/onboarding/:path*";
export const LOCAL_STORAGE_NAME = "isAuthenticated";

export const DEFAULT_COVER_PHOTO = "/public/assets/cover_placeholder.png";
export const DEFAULT_PROFILE_PHOTO = "/public/assets/profile_placeholder.png";

export const cardEditorUtils = {
  text: {
    icon: Text,
    name: "Text",
    functionName: "addText",
  },
  image: {
    icon: Image,
    name: "Image",
    functionName: "addImage",
  },
  circle: {
    icon: Circle,
    name: "Circle",
    functionName: "addCircle",
  },
  rectangle: {
    icon: RectangleHorizontal,
    name: "Rectangle",
    functionName: "addRectangle",
  },
  triangle: {
    icon: Triangle,
    name: "Triangle",
    functionName: "addTriangle",
  },
};

/**
 * Enum for user roles.
 * @readonly
 */
export const USER_ROLE_ENUMS = Object.freeze({
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
});

export const headerItems = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#quickguide", label: "Quick Guide" },
  { href: "/templates", label: "Templates" },
  { href: "/#contact", label: "Contact" },
];

export const companyListItem = [
  {
    title: "Bradwell",
    image: "/assets/company1.png",
  },
  {
    title: "InnovatEd",
    image: "/assets/company2.png",
  },
  {
    title: "Phil Airlines",
    image: "/assets/company3.png",
  },
  {
    title: "Company logo",
    image: "/assets/company4.png",
  },
  {
    title: "Highland Bali",
    image: "/assets/company5.png",
  },
];

export const tapupLearnMoreList = [
  {
    title: "Personal Website Creation",
    description:
      "Easily create your own professional website using pre-designed, customizable templates tailored to your needs.",
  },
  {
    title: "Powerful Web Builder",
    description:
      "Take full control of your websites design with an intuitive web builder that allows you to customize every detail.",
  },
  {
    title: "Printable Business Cards",
    description:
      "Generate high-quality, print-ready business cards to complement your digital presence and leave a lasting impression.",
  },
  {
    title: "Cross-Device Networking",
    description:
      "Enhance your professional connections with cards optimized for compatibility across a wide range of devices.",
  },
];

export const cardItems: CardItem[] = [
  {
    id: "card1",
    image: "/assets/cards/back/card1.png",
    title: "Standard Black Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    id: "card2",
    image: "/assets/cards/back/card2.png",
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    id: "card3",
    image: "/assets/cards/back/card3.png",
    title: "Standard Light Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 4000,
  },
  {
    id: "card4",
    image: "/assets/cards/back/card4.png",
    title: "Standard Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 2500,
  },
  {
    id: "card5",
    image: "/assets/cards/back/card5.png",
    title: "Standard White Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3600,
  },
];

export const stepItem = [
  {
    title: "Sign Up & Create Profile",
    description:
      "Create your account in seconds. Add your professional details, photo, and contact information to get started.",
  },
  {
    title: "Choose Your Template",
    description:
      "Browse our premium collection of NFC-enabled card designs. Pick a template that matches your style and brand.",
  },
  {
    title: "Customize Your Design",
    description:
      "Personalize your card with your logo, colors, and social media links. Make it uniquely yours with our easy editor.",
  },
  {
    title: "Order Your NFC Card",
    description:
      "Review your design and place your order. Get a physical NFC-enabled card delivered to your doorstep.",
  },
  {
    title: "Tap to Share",
    description:
      "Simply tap your card on any smartphone to instantly share your contact info. No app needed for recipients.",
  },
  {
    title: "Manage & Update",
    description:
      "Update your information anytime from your dashboard. Changes reflect instantly without reprinting cards.",
  },
];

export const courierList = [
  {
    name: "JRS Express",
    image: "/assets/courier/j&t.png",
    shippingFee: 50,
    minDays: 3,
    maxDays: 5,
  },
  {
    name: "LBC",
    image: "/assets/courier/lbc.png",
    shippingFee: 50,
    minDays: 3,
    maxDays: 5,
  },
];
export const carouselCards = {
  eclipse: {
    id: "eclipse",
    title: "Eclipse",
    price: 600,
    image: "/assets/cards/Eclipse-front.png",
    backImage: "/assets/cards/Eclipse-back.png",
    description: `A bold, minimalist design featuring striking contrasts and celestial elements. Perfect for executives and leaders who want to make a powerful, memorable impression.`,
  },
  aurora: {
    id: "aurora",
    title: "Aurora",
    price: 600,
    image: "/assets/cards/Aurora-front.png",
    backImage: "/assets/cards/Aurora-back.png",
    description: `A mesmerizing gradient design inspired by the northern lights, featuring vibrant blues and greens. Perfect for creative professionals who want to showcase their innovative spirit and artistic flair.`,
  },
  viper: {
    id: "viper",
    title: "Viper",
    price: 600,
    image: "/assets/cards/Viper-Front.png",
    backImage: "/assets/cards/Viper-back.png",
    description: `A sleek, aggressive design with sharp angles and dynamic patterns. Designed for entrepreneurs and innovators who want to project confidence and cutting-edge style.`,
  },
  vortex: {
    id: "vortex",
    title: "Vortex",
    price: 600,
    image: "/assets/cards/Vortex-front.png",
    backImage: "/assets/cards/Vortex-back.png",
    description: `A hypnotic swirl design that draws the eye inward with its circular patterns. Great for consultants and strategists who want to symbolize depth, focus, and transformative thinking.`,
  },
  bloom: {
    id: "bloom",
    title: "Bloom",
    price: 600,
    image: "/assets/cards/Bloom-front.png",
    backImage: "/assets/cards/Bloom-back.png",
    description: `An elegant floral-inspired design with soft, organic patterns. Ideal for professionals in wellness, beauty, or lifestyle industries who want to convey growth and natural sophistication.`,
  },
};

export const businessList = [
  {
    title: "Amazon",
    image: "/assets/amazon-gray.png",
  },
  {
    title: "Pay",
    image: "/assets/pay-gray.png",
  },
  {
    title: "Paypal",
    image: "/assets/paypal-gray.png",
  },
];

export const menuItems = [
  { icon: Home, title: "Home", href: "/home" },
  { icon: TbCards, title: "Cards", href: "/cards" },
  { icon: FiShoppingBag, title: "My Orders", href: "/orders" },
];

export const adminMenuItems = [
  { icon: Users, title: "User Management", href: "/admin" },
  { icon: Receipt, title: "Transactions", href: "/admin/transactions" },
  { icon: FiShoppingBag, title: "User Orders", href: "/admin/users-orders" },
  { icon: Package, title: "Card Bank", href: "/admin/card-bank" },
];

export const publicDomain =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
    : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;

export const formHeaderItems = [
  { id: 1, title: "Visual Content & Company Details" },
  { id: 2, title: "Personal Information & Social Links" },
  { id: 3, title: "Design & Finalization" },
];

export const steps = [
  { name: "Visual & Company", header: "Visual Content & Company Details" },
  {
    name: "Personal & Social",
    header: "Personal Information & Social Links",
  },
  { name: "Design & Settings", header: "Design & Finalization" },
];

export const accountItem = [
  { icon: LayoutDashboard, title: "Dashboard" },
  { icon: ArrowUp, title: "Taps" },
  { icon: CreditCard, title: "Billing" },
];

export const paymentCards = [
  {
    image: "/assets/payment/Visa.png",
    title: "Visa",
  },
  {
    image: "/assets/payment/Paypal.png",
    title: "Paypal",
  },
  {
    image: "/assets/payment/Mastercard.png",
    title: "Mastercard",
  },
];

export const orderItems = [
  {
    icon: Clock4,
    title: "Pending",
    route: "pending",
  },
  {
    icon: Package,
    title: "To Ship",
    route: "to-ship",
  },
  {
    icon: Truck,
    title: "To Receive",
    route: "to-receive",
  },
  {
    icon: PackageCheck,
    title: "Delivered",
    route: "delivered",
  },
  {
    icon: Undo2,
    title: "To Return/Refund",
    route: "to-return-refund",
  },
  {
    icon: X,
    title: "Cancelled",
    route: "cancelled",
  },
];
