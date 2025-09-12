import React from "react";
import TransactionDashboard from "./_components/TransactionBoard";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { USER_ROLE_ENUMS } from "@/constants";
import { notFound, redirect } from "next/navigation";
import { getAllTransactions } from "@/lib/firebase/actions/user.action";

export default async function UserOrdersPage() {
  const auth = await authCurrentUserv2();

  if (!auth) {
    redirect("/login");
  }
  if (auth?.role !== USER_ROLE_ENUMS.ADMIN && auth?.role !== USER_ROLE_ENUMS.SUPER_ADMIN) {
    notFound();
  }

  // if (!auth?.onboarding) {
  //   redirect("/onboarding");
  // }

  const transactions = await getAllTransactions({
    role: auth.role,
  });

  if (!transactions)
    return (
      <div className="place-self-center my-auto">
        No Transactions to Display
      </div>
    );

  return <TransactionDashboard transactionsData={transactions} />;
}
