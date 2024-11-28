import React from "react";
import Canvas2Card from "./canvas";
import { redirect } from "next/navigation";
import { getCardById } from "@/lib/firebase/actions/card.action";
import { catchErrorTyped } from "@/lib/utils";

const Card = async ({ id }: { id: string }) => {
  const [error, data] = await catchErrorTyped(getCardById(id));

  if (!data || error) {
    redirect("/cards");
  }

  const user = JSON.parse(JSON.stringify(data));

  return <Canvas2Card user={user} />;
};

export default Card;