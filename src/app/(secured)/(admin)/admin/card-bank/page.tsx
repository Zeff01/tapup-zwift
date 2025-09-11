"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/user-provider";
import CardBankDashboard from "./_components/CardBankDashboard";
import { USER_ROLE_ENUMS } from "@/constants";
import { Loader2 } from "lucide-react";

export default function CardBankPage() {
  const router = useRouter();
  const { user, isLoading } = useUserContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && mounted) {
      if (!user || (user.role !== USER_ROLE_ENUMS.ADMIN && user.role !== USER_ROLE_ENUMS.SUPER_ADMIN)) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, mounted, router]);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user || (user.role !== USER_ROLE_ENUMS.ADMIN && user.role !== USER_ROLE_ENUMS.SUPER_ADMIN)) {
    return null;
  }

  return <CardBankDashboard 
    userRole={user.role} 
    currentUser={{
      uid: user.uid,
      email: user.email || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || ''
    }}
  />;
}