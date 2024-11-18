"use client";

import { useUserSession } from "@/hooks/useUserSession";
import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { updateUserById } from "@/src/lib/firebase/store/users.action";
import { Users } from "@/src/lib/firebase/store/users.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

export interface ExtendedUserInterface extends Users {
  uid: string;
  role: string;
  onboarding: boolean;
}

export type UserState = ExtendedUserInterface | null;

export type UserProviderContextType = {
  user: UserState;
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
  const queryClient = useQueryClient();

  const { userUid } = useUserSession();
  const isAuthenticated = useMemo(() => Boolean(userUid), [userUid]);

  const { data: user, isPending: isUserLoading } = useQuery({
    queryKey: ["current-active-user", userUid],
    queryFn: async () => {
      const data = await currentAuthUserDetails({ id: userUid! });
      return { uid: userUid, ...data };
    },
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

  const updateUser = async (
    uid: string,
    userData: ExtendedUserInterface,
    currentUser = true
  ) => {
    if (!currentUser) return;
    updateUserMutation({ user_id: uid, user: userData });
  };

  const logOutUser = async () => {
    await signOutHandler();
  };

  const value = {
    user: user as UserState,
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
