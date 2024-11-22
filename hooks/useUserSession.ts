"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { User } from "firebase/auth";
import {
  createSession,
  deleteSession,
  getSession,
  signUserId,
  verifySignUserId,
} from "@/src/lib/firebase/config/session";
import { useRouter } from "next/navigation";
import { SignedUserIdJwtPayload } from "@/types/types";

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signOutUser = async () => {
    await signOutHandler();
    setUserUid(null);
    setUser(null);
  };

  const signOutIfInvalidSession = async (authUser: User) => {
    const sessionCookie = await getSession();
    const signUser = await signUserId(authUser.uid);

    const cookie = sessionCookie ?? signUser;

    const cookieSession = (await verifySignUserId(
      cookie
    )) as SignedUserIdJwtPayload | null;

    if (!sessionCookie) {
      await createSession(authUser.uid);
      router.refresh();
      return;
    }

    if (!cookieSession || cookieSession.uid !== authUser.uid) {
      await signOutUser();
      router.refresh();
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        setUserUid(null);
        setUser(null);
        await deleteSession();
        router.push("/login");
        return;
      }
      await signOutIfInvalidSession(authUser);

      setUserUid(authUser.uid);
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return { userUid, user };
}
