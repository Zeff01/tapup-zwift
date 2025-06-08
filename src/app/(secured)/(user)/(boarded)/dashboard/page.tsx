import { notFound, redirect } from "next/navigation";
import Dashboard from "./_components/DashboardPage";
import { authCurrentUserv2 } from "@/lib/firebase/auth";

export default async function DashboardPage() {
  const auth = await authCurrentUserv2();

  if (!auth) {
    redirect("/login");
  }

  if (!auth?.role) return notFound();

  return (
    <div className="flex-1">
      <Dashboard />
    </div>
  );
}
