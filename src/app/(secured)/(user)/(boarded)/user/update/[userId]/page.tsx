import { getUserById } from "@/lib/firebase/actions/user.action";

import { notFound, redirect } from "next/navigation";
import { catchErrorTyped } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import UpdateUserForm from "./_components/update-user-form";
import { ExtendedUserInterface } from "@/types/types";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";

const UpdateUser = async ({ id }: { id: string }) => {
  const [err, data] = await catchErrorTyped(getUserById(id));

  if (!data || err) {
    notFound();
  }

  const user = JSON.parse(JSON.stringify(data));

  return <UpdateUserForm data={user as ExtendedUserInterface} />;
};

const UserUpdatePage = async ({ params }: { params: { userId: string } }) => {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }

  const { userId } = params;

  return (
    <Suspense fallback={<Loading />} key={userId}>
      <UpdateUser id={userId} />
    </Suspense>
  );
};

export default UserUpdatePage;
