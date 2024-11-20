import React from "react";
import Canvas2Card from "./canvas";
import { redirect } from "next/navigation";
import { getCardById } from "@/src/lib/firebase/store/card.action";
import { unstable_cache } from "next/cache";

const cachedGetCardById = unstable_cache(
  async (id: string) => getCardById(id),
  ["preview-card-page"]
);

const Card = async ({ id }: { id: string }) => {
  const data = await cachedGetCardById(id);

  if (!data) redirect("/cards");

  const user = JSON.parse(JSON.stringify(data));

  return <Canvas2Card user={user} />;
};

export default Card;
