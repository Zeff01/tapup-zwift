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
