import { getUserById } from "@/lib/firebase/actions/user.action";

import { notFound } from "next/navigation";
import { catchErrorTyped } from "@/lib/safe-error-handling";
import { Suspense } from "react";
import Loading from "./loading";
import UpdateUserForm from "./_components/update-user-form";
import { ExtendedUserInterface } from "@/providers/user-provider";

const UpdateUser = async ({ id }: { id: string }) => {
  const [err, data] = await catchErrorTyped(getUserById(id));

  if (!data || err) {
    notFound();
  }

  const user = JSON.parse(JSON.stringify(data));

  return <UpdateUserForm data={user as ExtendedUserInterface} />;
};

const UserUpdatePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <Suspense fallback={<Loading />} key={userId}>
      <UpdateUser id={userId} />
    </Suspense>
  );
};

export default UserUpdatePage;
