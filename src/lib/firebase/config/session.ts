"use server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";
import { sign, verify } from "jsonwebtoken";

export const createSession = async (uid: string) => {
  const token = sign({ uid }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });

  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  // redirect(ONBOARDING_ROUTE);
};

export const deleteSession = async () => {
  cookies().delete(SESSION_COOKIE_NAME);
  // redirect(ROOT_ROUTE);
};

export const getSession = async () => {
  const sessionCookie = await cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return;
  return sessionCookie.value;
};

export const signUserId = async (uid: string) => {
  return sign({ uid }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });
};

export const verifySignUserId = async (token: string) => {
  try {
    const data = await verify(token, process.env.JWT_SECRET_KEY!);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
