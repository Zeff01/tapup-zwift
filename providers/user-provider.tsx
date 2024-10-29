"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserSession } from "@/hooks/useUserSession";
import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { Users } from "@/src/lib/firebase/store/users.type";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface ExtendedUserInterface extends Users {
  uid: string;
  role: string;
}

type UserState = ExtendedUserInterface | null;

export type UserProviderContextType = {
  user: UserState;
  setUser: React.Dispatch<
    React.SetStateAction<UserProviderContextType["user"]>
  >;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: () => void;
  logOutUser: () => void;
};

export const UserProviderContext = createContext<
  UserProviderContextType | undefined
>(undefined);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserState>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userUid } = useUserSession();
  const isAuthenticated = useMemo(() => Boolean(userUid), [userUid]);

  useEffect(() => {
    (async () => {
      if (!userUid) return;
      setIsLoading(true);
      const userData = await currentAuthUserDetails(userUid);
      if (!userData) {
        setIsLoading(false);
        return;
      }
      setUser({
        email: userData.email,
        role: userData.role,
        uid: userUid,
      });

      setIsLoading(false);
    })();
  }, [userUid]);

  const updateUser = async () => {};

  const logOutUser = async () => {
    await signOutHandler();
    localStorage.removeItem("isAuthencitated");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    isLoading,
    updateUser,
    logOutUser,
  };
  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
};

export function useUserContext() {
  const user = useContext(UserProviderContext);
  if (!user) {
    throw new Error(
      "useUserContext must be used within an UserContextProvider"
    );
  }
  return user;
}
