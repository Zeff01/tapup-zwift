"use client";

import { useUserSession } from "@/hooks/useUserSession";
import { currentAuthUserDetails, signOutHandler } from "@/lib/firebase/auth";
import { updateUserById } from "@/lib/firebase/actions/user.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ExtendedUserInterface,
  Notifications,
  UserState,
  Notification,
} from "@/types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import useNotification from "@/hooks/useNotification";

export type UserProviderContextType = {
  user: UserState;
  notifications: Notifications | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (
    uid: string,
    userData: ExtendedUserInterface,
    currentUser?: boolean
  ) => void;
  logOutUser: () => void;
};

export const UserProviderContext = createContext<
  UserProviderContextType | undefined
>(undefined);

export const UserContextProvider = ({ children }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userUid } = useUserSession();
  const isAuthenticated = useMemo(() => Boolean(userUid), [userUid]);

  const notif = useNotification({ userUid });

  const { data: user, isPending: isUserLoading } = useQuery({
    queryKey: ["current-active-user", userUid],
    queryFn: async () => {
      const data = await currentAuthUserDetails({ id: userUid! });
      return { uid: userUid, ...data };
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userUid,
  });

  const { mutate: updateUserMutation, isPending: isLoadingUpdateMuitation } =
    useMutation({
      mutationFn: updateUserById,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["current-active-user", user?.uid],
        });
      },
    });

  const isLoading = isUserLoading || isLoadingUpdateMuitation;

  const updateUser = async (uid: string, userData: ExtendedUserInterface) => {
    updateUserMutation({ user_id: uid, user: userData });
  };

  const logOutUser = async () => {
    await signOutHandler();
    router.push("/login");
  };

  const value = {
    user: user as UserState,
    notifications: notif,
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
