import { authCurrentUserv2 } from "@/lib/firebase/auth";
import Cards from "./_components/cards";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound, redirect } from "next/navigation";

export default async function CardPage() {
  const auth = await authCurrentUserv2();

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  if (!auth?.onboarding) {
    redirect("/onboarding");
  }

  return (
    <div className="flex-1">
      <Cards />
    </div>
  );
}
