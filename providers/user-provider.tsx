"use client";

import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import { getSession } from "@/src/lib/firebase/config/session";
import { Users } from "@/src/lib/firebase/store/users.type";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthencitated") === "true"
  );

  firebaseAuth.onAuthStateChanged(async (authUser) => {
    if (!authUser) {
      localStorage.removeItem("isAuthencitated");
      setIsAuthenticated(false);
      return;
    }
    localStorage.setItem("isAuthencitated", "true");
    setIsAuthenticated(true);
    setAuthUserId(authUser?.uid ?? null);
  });

  useEffect(() => {
    (async () => {
      if (!authUserId) return;
      setIsLoading(true);
      const userData = await currentAuthUserDetails(authUserId);
      if (!userData) {
        setIsLoading(false);
        return;
      }
      setUser({
        email: userData.email,
        role: userData.role,
        uid: authUserId,
      });

      setIsLoading(false);
    })();
  }, [authUserId]);

  const updateUser = async () => {};

  const logOutUser = async () => {
    await signOutHandler();
    localStorage.removeItem("isAuthencitated");
    setUser(null);
    setAuthUserId(null);
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
