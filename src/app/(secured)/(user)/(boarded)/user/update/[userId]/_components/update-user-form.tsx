"use client";

import CardsAndUsersFields from "@/components/forms/CardsAndUsersUpdateFields";
import { USER_ROLE_ENUMS } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import { ExtendedUserInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

const UpdateUserForm = ({ data }: { data: ExtendedUserInterface }) => {
  const { user } = useUserContext();
  const router = useRouter();

  if (!user) {
    router.push("/cards");
    return;
  }

  if (user?.role === USER_ROLE_ENUMS.ADMIN && data.id !== user.uid)
    return <CardsAndUsersFields userData={data} />;

  return <CardsAndUsersFields isCurrentUser userData={user!} />;
};

export default UpdateUserForm;
