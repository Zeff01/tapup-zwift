"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";
import { sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY!;

export const createSession = async (uid: string) => {
  const token = sign({ uid }, secret, {
    expiresIn: "1h",
  });

  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
};

export const deleteSession = async () => {
  cookies().delete(SESSION_COOKIE_NAME);
};

export const getSession = async () => {
  const sessionCookie = await cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return;
  return sessionCookie.value;
};

export const signUserId = async (uid: string) => {
  return sign({ uid }, secret, {
    expiresIn: "1h",
  });
};

export const verifySignUserId = async (token: string) => {
  try {
    const data = await verify(token, secret);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
