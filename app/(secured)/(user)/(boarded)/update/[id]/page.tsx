"use client";

import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
import CardAndUserFields from "@/components/forms/CardsAndUsersUpdateFields";
import { useEffect, useState } from "react";
import Loading from "./loading";
import {
  ExtendedUserInterface,
  useUserContext,
} from "@/providers/user-provider";
import { ADMIN_ONLY_ROUTE, USER_ROLE_ENUMS } from "@/constants";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Error from "next/error";

export default function UpdatePage({ params }: { params: { id: string } }) {
  const { user } = useUserContext();
  const [fetchUser, setFetchUser] = useState<ExtendedUserInterface | null>(
    null
  );
  const [status, setStatus] = useState<"normal" | "fetching" | "error">(
    "normal"
  );

  useEffect(() => {
    (async () => {
      setStatus("fetching");
      const firebaseUser = await getUserBySubId(params.id);
      if (!firebaseUser) {
        setStatus("error");
        return;
      }
      setFetchUser(firebaseUser as ExtendedUserInterface);
      setStatus("normal");
    })();
  }, []);

  if (status === "error" && user?.role === USER_ROLE_ENUMS.ADMIN) {
    toast.error("User not found");
    return redirect(ADMIN_ONLY_ROUTE);
  }

  if (status === "error" && user?.role === USER_ROLE_ENUMS.USER) {
    return <Error statusCode={404} />;
  }

  if (!fetchUser || (!fetchUser && status === "fetching")) {
    return <Loading />;
  }

  if (user?.role === USER_ROLE_ENUMS.ADMIN && params.id !== user.uid)
    return <CardAndUserFields currentUser={false} userData={fetchUser} />;

  return <CardAndUserFields userData={user!} />;
}
