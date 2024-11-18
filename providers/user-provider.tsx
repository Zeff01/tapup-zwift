"use client";

import { useUserSession } from "@/hooks/useUserSession";
import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { updateUserById } from "@/src/lib/firebase/store/users.action";
import { Users } from "@/src/lib/firebase/store/users.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

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

  // const [user, setUser] = useState<UserState>(null);
  // const [isLoading, setIsLoading] = useState(false);

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

  // console.log(isLoading);

  // useEffect(() => {
  //   (async () => {
  //     if (!userUid) return;
  //     setIsLoading(true);
  //     const userData = await currentAuthUserDetails(userUid);
  //     if (!userData) {
  //       setIsLoading(false);
  //       return;
  //     }
  //     setUser({
  //       ...(userData as ExtendedUserInterface),
  //       uid: userUid,
  //     });

  //     setIsLoading(false);
  //   })();
  // }, [userUid]);

  const updateUser = async (
    uid: string,
    userData: ExtendedUserInterface,
    currentUser = true
  ) => {
    if (!currentUser) return;
    console.log("wewwew");
    updateUserMutation({ user_id: uid, user: userData });
    // setIsLoading(true);
    // const updateStatus = await updateUserById(uid, userData);
    // if (!updateStatus) {
    //   setIsLoading(false);
    //   return;
    // }
    // if (!currentUser) {
    //   setIsLoading(false);
    //   return;
    // }
    // setUser((prev) => ({ ...prev, ...userData }));
    // setIsLoading(false);
  };

  const logOutUser = async () => {
    await signOutHandler();
    // setUser(null);
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
