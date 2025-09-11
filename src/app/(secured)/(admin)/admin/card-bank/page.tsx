import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";
import CardBankDashboard from "./_components/CardBankDashboard";
import { USER_ROLE_ENUMS } from "@/constants";

export default async function CardBankPage() {
  const user = await authCurrentUserv2();

  if (!user || (user.role !== USER_ROLE_ENUMS.ADMIN && user.role !== USER_ROLE_ENUMS.SUPER_ADMIN)) {
    redirect("/dashboard");
  }

  return <CardBankDashboard 
    userRole={user.role} 
    currentUser={{
      uid: user.uid,
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
    }}
  />;
}