import { notFound, redirect } from "next/navigation";
import Dashboard from "./_components/DashboardPage";
import { USER_ROLE_ENUMS } from "@/constants";
import { authCurrentUserv2 } from "@/lib/firebase/auth";

export default async function DashboardPage() {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  console.log(auth);

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }

  return (
    <div className="flex-1">
      <Dashboard />
    </div>
  );
}
