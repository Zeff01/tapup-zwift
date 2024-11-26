"use client";

import CardsAndUsersFields from "@/components/forms/CardsAndUsersUpdateFields";
import MultiStepFormUpdate from "@/components/forms/multi-step-form-update";
import { USER_ROLE_ENUMS } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import { ExtendedUserInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

const UpdateUserForm = ({ data }: { data: ExtendedUserInterface }) => {
  const { user } = useUserContext();
  const router = useRouter();

  if (!user) return router.push("/dashboard");

  if (user?.role === USER_ROLE_ENUMS.ADMIN && data.id !== user.uid)
    return <MultiStepFormUpdate userData={user!} />;

  return <MultiStepFormUpdate isCurrentUser userData={user!} />;
};

export default UpdateUserForm;
