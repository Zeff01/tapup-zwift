"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function OrdersHomePage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/orders") {
      router.push("/orders/pending");
    }
  }, [pathname, router]);

  return null;
}
