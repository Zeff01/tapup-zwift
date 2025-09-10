import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";
import CardBankDashboard from "./_components/CardBankDashboard";

export default async function CardBankPage() {
  const user = await authCurrentUserv2();

  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return <CardBankDashboard />;
}