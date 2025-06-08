import { authCurrentUserv2 } from "@/lib/firebase/auth";
import Cards from "./_components/cards";

import { notFound, redirect } from "next/navigation";

export default async function CardPage() {
  const auth = await authCurrentUserv2();

  if (!auth) {
    redirect("/login");
  }

  if (!auth?.role) return notFound();

  return (
    <div className="flex-1">
      <Cards />
    </div>
  );
}
