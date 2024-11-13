import { CardItem } from "@/types/types";
import {
  ArrowBigRight,
  CheckCircleIcon,
  Circle,
  Image,
  RectangleHorizontal,
  Text,
  Triangle,
} from "lucide-react";

export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const RESET_PASSWORD_ROUTE = "/resetPassword";
export const FORGOT_PASSWORD_ROUTE = "/forgotPassword";
export const SESSION_COOKIE_NAME = "user_session";
export const ONBOARDING_ROUTE = "/onboarding";
export const DASHBOARD_ROUTE = "/dashboard";
export const ADMIN_ONLY_ROUTE = "/users";
export const CARD_ROUTE = "/card";
export const USER_ROUTE = "/users";
export const UPDATE_ROUTE = "/update";
export const ACTION_ROUTE = "/action";
export const CARD_PATH = "/card(/.*)?";
export const ADMIN_ONLY_PATH = "/users(/.*)?";
export const UPDATE_PATH = "/update(/.*)?";
export const ONBOARDING_PATH = "/onboarding(/.*)?";
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
  { href: "/", label: "Main" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/features", label: "Features" },
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
    icon: CheckCircleIcon,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
  },
  {
    icon: CheckCircleIcon,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
  },
  {
    icon: CheckCircleIcon,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
  },
];

export const cardItems: CardItem[] = [
  {
    image: "/assets/tapUp-card1.png",
    title: "Standard Black Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: "/assets/tapUp-card2.png",
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: "/assets/tapUp-card3.png",
    title: "Standard Light Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 4000,
  },
  {
    image: "/assets/tapUp-card4.png",
    title: "Standard Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 2500,
  },
  {
    image: "/assets/tapUp-card5.png",
    title: "Standard White Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3600,
  },
  {
    image: "/assets/tapUp-card2.png",
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
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

export const carouselCards = {
  card1: {
    title: "Standard Black Card",
    image: "/assets/tapUp-card1.png",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur minima quia porro vel obcaecati dicta asperiores? Numquam velit soluta fugit iure suscipit, odit, veniam reiciendis eveniet nesciunt, consequuntur cum dicta.`,
  },
  card2: {
    title: "Standard Yellow Card",
    image: "/assets/tapUp-card2.png",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur minima quia porro vel obcaecati dicta asperiores? Numquam velit soluta fugit iure suscipit, odit, veniam reiciendis eveniet nesciunt, consequuntur cum dicta.`,
  },
  card3: {
    title: "Standard Blue Card",
    image: "/assets/tapUp-card3.png",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur minima quia porro vel obcaecati dicta asperiores? Numquam velit soluta fugit iure suscipit, odit, veniam reiciendis eveniet nesciunt, consequuntur cum dicta.`,
  },
  card4: {
    title: "Standard Dark Blue Card",
    image: "/assets/tapUp-card4.png",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur minima quia porro vel obcaecati dicta asperiores? Numquam velit soluta fugit iure suscipit, odit, veniam reiciendis eveniet nesciunt, consequuntur cum dicta.`,
  },
  card5: {
    title: "Standard Special Card",
    image: "/assets/tapUp-card5.png",
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur minima quia porro vel obcaecati dicta asperiores? Numquam velit soluta fugit iure suscipit, odit, veniam reiciendis eveniet nesciunt, consequuntur cum dicta.`,
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
