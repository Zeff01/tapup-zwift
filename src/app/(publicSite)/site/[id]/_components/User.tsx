import React from "react";
// import Error from "next/error";
import UserPage from "./TemplateHandler";
import { getCardById } from "@/lib/firebase/actions/card.action";
import { notFound } from "next/navigation";
import { catchErrorTyped } from "@/lib/utils";

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
