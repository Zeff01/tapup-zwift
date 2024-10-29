import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/src/lib/firebase/config/auth";
import { User } from "firebase/auth";
import { LOCAL_STORAGE_NAME } from "@/constants";

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        localStorage.removeItem(LOCAL_STORAGE_NAME);
        setUserUid(null);
        setUser(null);
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_NAME, "true");
      setUserUid(authUser.uid);
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return { userUid, user };
}
