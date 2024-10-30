import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  CREATE_ROUTE,
  CARD_ROUTE,
  SECRET_ROUTE,
  USER_ROUTE,
  UPDATE_ROUTE,
  CARD_PATH,
  USER_PATH,
  UPDATE_PATH,
  CREATE_PATH,
  ACTION_ROUTE,
} from "@/constants";

const protectedRoutes = [
  CREATE_ROUTE,
  CARD_ROUTE,
  SECRET_ROUTE,
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
    const createRouterUrl = new URL(CREATE_ROUTE, request.url);
    return NextResponse.redirect(createRouterUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    CREATE_PATH,
    CARD_PATH,
    USER_PATH,
    UPDATE_PATH,
  ],
};
