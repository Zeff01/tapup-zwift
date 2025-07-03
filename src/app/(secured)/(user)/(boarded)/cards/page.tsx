// app/cards/page.tsx
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { notFound, redirect } from "next/navigation";
import Cards from "./_components/cards";

export default async function CardPage() {
  const auth = await authCurrentUserv2();

  if (!auth) redirect("/login");
  if (!auth?.role) return notFound();

  return (
    <div className={`flex-1`}>
      <Cards />
    </div>
  );
}
