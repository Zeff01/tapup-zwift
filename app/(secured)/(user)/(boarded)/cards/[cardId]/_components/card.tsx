import React from "react";
import Canvas2Card from "./canvas";
import { redirect } from "next/navigation";
import { getCardById } from "@/src/lib/firebase/store/card.action";
import { catchErrorTyped } from "@/lib/safe-error-handling";

const Card = async ({ id }: { id: string }) => {
  const [error, data] = await catchErrorTyped(getCardById(id));

  if (!data || error) {
    redirect("/cards");
  }

  const user = JSON.parse(JSON.stringify(data));

  return <Canvas2Card user={user} />;
};

export default Card;
