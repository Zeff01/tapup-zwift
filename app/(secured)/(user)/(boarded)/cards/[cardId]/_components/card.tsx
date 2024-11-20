import React from "react";
import Canvas2Card from "./canvas";
import { redirect } from "next/navigation";
import { getCardById } from "@/src/lib/firebase/store/card.action";

const Card = async ({ id }: { id: string }) => {
  const data = await getCardById(id);

  if (!data) redirect("/cards");

  const user = JSON.parse(JSON.stringify(data));

  return <Canvas2Card user={user} />;
};

export default Card;
