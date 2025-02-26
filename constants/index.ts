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
} from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { TbCards, TbSettingsFilled } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";

export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const RESET_PASSWORD_ROUTE = "/resetPassword";
export const FORGOT_PASSWORD_ROUTE = "/forgotPassword";
export const SESSION_COOKIE_NAME = "user_session";
export const ONBOARDING_ROUTE = "/onboarding";
export const DASHBOARD_ROUTE = "/dashboard";
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
  ADMIN: "admin",
  USER: "user",
});

export const headerItems = [
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#quickguide", label: "Quick Guide" },
  { href: "/#products", label: "Products" },
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
    title: "Sign Up",
    description:
      "Create an account in a few simple steps.Just enter your basic details and you're ready to go!",
  },
  {
    title: "Choose Your Card Type",
    description:
      "Select from a variety of customizable card templates designed to fit your needs.",
  },
  {
    title: "Customize Your Card Type",
    description:
      "Personalized your card by adding text, image and other design elements.",
  },
  {
    title: "Preview & Save",
    description:
      "Once you're happy with the design, preview the card to make sure everything looks perfect.",
  },
  {
    title: "Share or Print",
    description:
      "You can now share your card digitally or print it out for physical use",
  },
  {
    title: "Share or Print",
    description:
      "You can now share your card digitally or print it out for physical use",
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
  card1: {
    title: "Midnight Flow",
    image: "/assets/cards/back/card1.png",
    description:
      "A sleek and modern design with deep purple and black gradients, perfect for professionals who want to leave a bold impression. The fluid background adds a touch of elegance, making it ideal for tech and innovation-driven individuals.",
  },
  card2: {
    title: "Golden Vision",
    image: "/assets/cards/back/card2.png",
    description:
      "A bright and confident design with a yellow backdrop that radiates energy and optimism. This card is perfect for go-getters who want to stand out with a vibrant yet professional look.",
  },
  card3: {
    title: "Green Edge",
    image: "/assets/cards/back/card3.png",
    description:
      "A refreshing design that blends green and white for a clean and energetic feel. The curved accent brings movement, symbolizing growth and innovation—great for those in sustainability, wellness, or entrepreneurship.",
  },
  card4: {
    title: "Blue Horizon",
    image: "/assets/cards/back/card4.png",
    description:
      "A soft yet professional blue gradient gives this card a calm and collected feel. Ideal for corporate professionals and creatives who want a subtle but impactful presence.",
  },
  card5: {
    title: "Serene Blend",
    image: "/assets/cards/back/card5.png",
    description:
      "A soothing mix of soft blue and pink gradients, creating a professional yet inviting look. This design is perfect for individuals who want a refined and balanced aesthetic that conveys trust and warmth. ",
  },
  card6: {
    title: "Custom Card",
    image: "/assets/cards/gridImg.png",
    description: `Using our card builder, you can personalize your cards by adding text, images, and various design elements, allowing you to create something truly unique and special.`,
  },
  card7: {
    title: "Arctic Clarity",
    image: "/assets/cards/back/card6.png",
    description:
      "A crisp and professional layout featuring icy blue tones and a minimalist structure. Best for those who prefer a polished and straightforward approach to networking.",
  },
  card8: {
    title: "Sunrise Spark",
    image: "/assets/cards/back/card7.png",
    description:
      "A lively mix of warm orange and cool blue, evoking a balance of creativity and trust. This design is great for those who want a friendly yet professional aesthetic that welcomes conversation.",
  },
  card9: {
    title: "Verdant Flow",
    image: "/assets/cards/back/card8.png",
    description:
      "A dynamic green and white layout with a sleek curve, symbolizing growth and innovation. This card is a great fit for professionals in tech, sustainability, or business, offering a fresh and energetic look while maintaining a professional feel.",
  },
  card10: {
    title: "Rose Radiance",
    image: "/assets/cards/back/card9.png",
    description:
      "A soft yet confident mix of pink and red hues, adding a touch of charm and elegance. Ideal for creative professionals, designers, or anyone who wants a stylish, memorable introduction.",
  },
  card11: {
    title: "Global Vision",
    image: "/assets/cards/back/card10.png",
    description:
      "A global-themed design with a purple gradient, representing ambition and international reach. This card suits professionals aiming to expand their network across borders.",
  },
  card12: {
    title: "Cosmic Grid",
    image: "/assets/cards/back/card11.png",
    description:
      "A deep-space-inspired design with digital lines, symbolizing connection and innovation. Great for tech enthusiasts, developers, and engineers who want a sophisticated and modern card.",
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
  { icon: CgProfile, title: "Profile", href: "/dashboard" },
  // { icon: RxDashboard, title: "Dashboard", href: "/dashboard" },
  { icon: TbCards, title: "Cards", href: "/cards" },
  // { icon: FiShoppingBag, title: "Orders", href: "/orders" },
  { icon: TbSettingsFilled, title: "Settings", href: "/settings" },
];

export const publicDomain =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
    : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;

export const formHeaderItems = [
  { id: 1, title: "Tell us about your company" },
  { id: 2, title: "Update your personal information" },
  { id: 3, title: "Tell us about your company" },
];

export const steps = [
  { name: "Company Info", header: "Tell us about your company" },
  {
    name: "Personal Info",
    header: "Update your personal information",
  },
  { name: "Template", header: "Choose your Template" },
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
