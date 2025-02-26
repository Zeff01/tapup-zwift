"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingLogo from "@/components/LoadingLogo";

export default function OrdersHomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (pathname === "/orders") {
      setLoading(true);
      router.push("/orders/pending");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
    <LoadingLogo/>
    );
  }

  return null;
}