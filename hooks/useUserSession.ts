import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/src/lib/firebase/config/auth";
import { User } from "firebase/auth";

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
        setUser(authUser);
      } else {
        setUserUid(null);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userUid, user };
}
