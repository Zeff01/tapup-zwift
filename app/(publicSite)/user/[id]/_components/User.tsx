import React from "react";
// import Error from "next/error";
import UserPage from "./TemplateHandler";
import { getCardById } from "@/src/lib/firebase/store/card.action";
import { redirect, notFound } from "next/navigation";
import { catchErrorTyped } from "@/lib/safe-error-handling";

const UserWebpage = async ({ id }: { id: string }) => {
  const [error, data] = await catchErrorTyped(
    getCardById(id, { publicSite: true })
  );

  if (!data || error) {
    notFound();
  }

  const user = JSON.parse(JSON.stringify(data));

  return <UserPage userData={user} />;
};

export default UserWebpage;
