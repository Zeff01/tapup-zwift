// app/cards/page.tsx
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { notFound, redirect } from "next/navigation";
import ClientCardWrapper from "./_components/client-card-wrapper";

export default async function CardPage() {
  const auth = await authCurrentUserv2();

  if (!auth) redirect("/login");
  if (!auth?.role) return notFound();

  return <ClientCardWrapper />;
}
