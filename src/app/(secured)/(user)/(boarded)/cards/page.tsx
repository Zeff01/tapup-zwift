import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { notFound, redirect } from "next/navigation";
import CardsWithOrders from "./_components/CardsWithOrders";

export default async function CardPage() {
  const auth = await authCurrentUserv2();

  if (!auth) redirect("/login");
  if (!auth?.role) return notFound();

  return (
    <div className={`flex-1`}>
      <CardsWithOrders />
    </div>
  );
}
