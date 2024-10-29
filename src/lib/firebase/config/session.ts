"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CREATE_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/constants";

export const createSession = async (uid: string) => {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect(CREATE_ROUTE);
};

export const deleteSession = async () => {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect(ROOT_ROUTE);
};

export const getSession = async () => {
  const sessionCookie = await cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return;
  return sessionCookie.value;
};
