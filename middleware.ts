import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  ONBOARDING_ROUTE,
  CARD_ROUTE,
  DASHBOARD_ROUTE,
  USER_ROUTE,
  UPDATE_ROUTE,
  CARD_PATH,
  ADMIN_ONLY_PATH,
  UPDATE_PATH,
  ONBOARDING_PATH,
  ACTION_ROUTE,
} from "@/constants";

const protectedRoutes = [
  ONBOARDING_ROUTE,
  CARD_ROUTE,
  DASHBOARD_ROUTE,
  USER_ROUTE,
  UPDATE_ROUTE,
  ACTION_ROUTE,
];
const authRoutes = [LOGIN_ROUTE, SIGNUP_ROUTE];

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const { pathname } = request.nextUrl;
  if (!session) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const loginURL = new URL(LOGIN_ROUTE, request.url);
      return NextResponse.redirect(loginURL);
    }
    return NextResponse.next();
  }
  if (authRoutes.some((route) => pathname === route)) {
    const onboardingRoute = new URL(ONBOARDING_ROUTE, request.url);
    return NextResponse.redirect(onboardingRoute);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ONBOARDING_PATH,
    CARD_PATH,
    ADMIN_ONLY_PATH,
    UPDATE_PATH,
  ],
};
