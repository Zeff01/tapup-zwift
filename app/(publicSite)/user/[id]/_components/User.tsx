import React from "react";
// import Error from "next/error";
import UserPage from "./TemplateHandler";
import { getCardById } from "@/src/lib/firebase/store/card.action";
import { redirect } from "next/navigation";

const UserWebpage = async ({ id }: { id: string }) => {
  let user = null;

  try {
    const data = await getCardById(id);

    if (!data) {
      redirect("/404");
    }

    user = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching card data:", error);
    redirect("/404");
  }

  return <UserPage userData={user} />;
};

export default UserWebpage;
