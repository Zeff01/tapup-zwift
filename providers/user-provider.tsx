"use client";

import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import { Users } from "@/src/lib/firebase/store/users.type";
import { User } from "firebase/auth";
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
};

export const UserProviderContext = createContext<
  UserProviderContextType | undefined
>(undefined);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserState>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  firebaseAuth.onAuthStateChanged(async (authUser) => {
    setAuthUser(authUser);
  });
  useEffect(() => {
    (async () => {
      console.log(authUser);

      // await signOutHandler();
    })();
  }, [authUser]);
  const value = {
    user,
    setUser,
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
