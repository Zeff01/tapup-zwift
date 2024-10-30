"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { User } from "firebase/auth";
import { createSession, getSession } from "@/src/lib/firebase/config/session";
import { useRouter } from "next/navigation";

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signOutUser = async () => {
    await signOutHandler();
    setUserUid(null);
    setUser(null);
  };

  const signOutIfInvalidSession = async (
    authUser: User | null,
    cookieSession: string | undefined
  ) => {
    // If cookie is tampered or cookie is added even there's no authenticated users
    if (!authUser || (cookieSession && cookieSession !== authUser.uid)) {
      await signOutUser();
      router.refresh();
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      const cookieSession = await getSession();
      await signOutIfInvalidSession(authUser, cookieSession);
      if (!authUser) return;

      setUserUid(authUser.uid);
      setUser(authUser);

      // If cookie is deleted even authenticated
      if (!cookieSession) {
        await createSession(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userUid, user };
}
