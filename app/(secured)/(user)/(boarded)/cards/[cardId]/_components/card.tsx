import React from "react";
import Canvas2Card from "./canvas";
import { redirect } from "next/navigation";
import { getCardById } from "@/src/lib/firebase/store/card.action";

const Card = async ({ id }: { id: string }) => {
  let user = null;

  try {
    const data = await getCardById(id);

    if (!data) {
      redirect("/cards");
    }

    user = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching card data:", error);
    redirect("/cards");
  }

  return <Canvas2Card user={user} />;
};

export default Card;
