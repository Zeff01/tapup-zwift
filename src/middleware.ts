import { type NextRequest, NextResponse } from "next/server";
import { verifyPasswordResetCode } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/firebase";
import {
  SESSION_COOKIE_NAME,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  ONBOARDING_ROUTE,
  CARD_ROUTE,
  DASHBOARD_ROUTE,
  USER_ROUTE,
  UPDATE_ROUTE,
  ACTION_ROUTE,
  RESET_PASSWORD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
} from "@/constants";

const protectedRoutes = [
  ONBOARDING_ROUTE,
  CARD_ROUTE,
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  USER_ROUTE,
  UPDATE_ROUTE,
  ACTION_ROUTE,
];
const authRoutes = [
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
];

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const { pathname, searchParams } = request.nextUrl;

  const redirectTo = (route: string) => new URL(route, request.url);
  if (!session) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(redirectTo(LOGIN_ROUTE));
    }
    if (pathname.startsWith(RESET_PASSWORD_ROUTE)) {
      const { oobCode, continueURL, mode, apiKey } =
        Object.fromEntries(searchParams);

      if (!oobCode && !continueURL && !mode && !apiKey) {
        return NextResponse.redirect(redirectTo(LOGIN_ROUTE));
      }
      try {
        await verifyPasswordResetCode(firebaseAuth, oobCode as string);
      } catch (error) {
        return NextResponse.redirect(redirectTo(LOGIN_ROUTE));
      }
    }
    return NextResponse.next();
  }

  if (session && pathname === "/") {
    return NextResponse.redirect(redirectTo(DASHBOARD_ROUTE));
  }

  if (authRoutes.some((route) => pathname === route)) {
    return NextResponse.redirect(redirectTo(DASHBOARD_ROUTE));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
