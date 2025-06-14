"use client";

import { useUserSession } from "@/hooks/useUserSession";
import { currentAuthUserDetails, signOutHandler } from "@/lib/firebase/auth";
import { updateUserById } from "@/lib/firebase/actions/user.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo } from "react";
import { ExtendedUserInterface, UserState } from "@/types/types";

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
  const router = useRouter();
  const queryClient = useQueryClient();

  const { userUid, isUserSessionLoading } = useUserSession();
  const isAuthenticated = useMemo(() => Boolean(userUid), [userUid]);

  const { data: user, isPending: isUserLoading } = useQuery({
    enabled: !!userUid,
    queryKey: ["current-active-user", userUid],
    queryFn: async () => {
      const data = await currentAuthUserDetails({ id: userUid! });
      return { uid: userUid, ...data };
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: true, // refetch when component mounts after stale
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

  const isLoading =
    (isUserLoading && !!userUid) ||
    isLoadingUpdateMuitation ||
    isUserSessionLoading;

  // console.log(isLoading);

  const updateUser = async (uid: string, userData: ExtendedUserInterface) => {
    updateUserMutation({ user_id: uid, user: userData });
  };

  const logOutUser = async () => {
    await signOutHandler();
    router.push("/login");
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
