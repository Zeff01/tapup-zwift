"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/user-provider";
import CardBankDashboardV2 from "./_components/CardBankDashboardV2";
import { USER_ROLE_ENUMS } from "@/constants";
import { Loader2 } from "lucide-react";
import { getPregeneratedCards, getCardGenerationLogs } from "@/lib/firebase/actions/card-bank.action";

export default function CardBankPage() {
  const router = useRouter();
  const { user, isLoading } = useUserContext();
  const [initialCards, setInitialCards] = useState<any[]>([]);
  const [initialLogs, setInitialLogs] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role !== USER_ROLE_ENUMS.ADMIN && user.role !== USER_ROLE_ENUMS.SUPER_ADMIN) {
        router.push("/cards");
      } else {
        // Fetch initial data without React Query
        const fetchInitialData = async () => {
          try {
            const [cards, logs] = await Promise.all([
              getPregeneratedCards(),
              user.role === USER_ROLE_ENUMS.SUPER_ADMIN ? getCardGenerationLogs() : Promise.resolve([])
            ]);
            setInitialCards(cards);
            setInitialLogs(logs);
          } catch (error) {
            console.error("Error fetching initial data:", error);
          } finally {
            setDataLoading(false);
          }
        };
        fetchInitialData();
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (user.role !== USER_ROLE_ENUMS.ADMIN && user.role !== USER_ROLE_ENUMS.SUPER_ADMIN) {
    return null;
  }

  return <CardBankDashboardV2 
    userRole={user.role} 
    currentUser={{
      uid: user.uid,
      email: user.email || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || ''
    }}
    initialCards={initialCards}
    initialLogs={initialLogs}
  />;
}