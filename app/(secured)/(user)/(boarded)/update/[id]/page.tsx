"use client";

import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
import UpdateComponent from "./UpdateComponent";
import { useEffect, useState } from "react";
import { Users } from "@/src/lib/firebase/store/users.type";
import Loading from "./loading";
import { useUserContext } from "@/providers/user-provider";

export default function UpdatePage() {
  const { user, isLoading } = useUserContext();

  if (!user || (!user && isLoading)) {
    return <Loading />;
  }
  return <UpdateComponent userData={user} />;
}
