"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOutHandler } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import {
  createSession,
  deleteSession,
  getSession,
  signUserId,
  verifySignUserId,
} from "@/lib/session";
import { useRouter } from "next/navigation";
import { SignedUserIdJwtPayload } from "@/types/types";

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);
  const [isUserSessionLoading, setIsUserSessionLoading] = useState(true);
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
      router.push("/dashboard");
      return;
    }

    if (!cookieSession || cookieSession.uid !== authUser.uid) {
      await signOutUser();
      router.push("/login");
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      setIsUserSessionLoading(true);
      if (!authUser) {
        const sessionCookie = await getSession();

        setUserUid(null);
        setUser(null);

        if (sessionCookie) {
          await deleteSession();
          router.push("/login");
        }
        setIsUserSessionLoading(false);
        return;
      }
      await signOutIfInvalidSession(authUser);

      setUserUid(authUser.uid);
      setUser(authUser);
      setIsUserSessionLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  return { userUid, user, isUserSessionLoading };
}
