"use client";

import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
import UpdateComponent from "./UpdateComponent";

export default async function UpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const getUser = await getUserBySubId(params.id);
  if (!getUser) return <div>Invalid User ID</div>;

  return <UpdateComponent userData={getUser} />;
}
