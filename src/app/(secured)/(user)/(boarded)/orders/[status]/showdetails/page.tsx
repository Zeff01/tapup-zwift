"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShowDetails from "../../_components/ShowDetails";
import { Order } from "@/types/types";
import { urlToStatus } from "@/constants/orderStatus";

import { IoArrowBack } from "react-icons/io5";
import { exampleOrders } from "@/constants/exampleOrders";

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathname) return;

    const parts = pathname.split("/");
    const statusKey = parts[parts.indexOf("orders") + 1];
    const status = urlToStatus[statusKey];

    if (status) {
      const foundOrder = exampleOrders.find(
        (order) =>
          order.status === status && (!orderId || order.orderId === orderId)
      );
      setOrder(foundOrder || null);
    }

    setLoading(false);
  }, [pathname, orderId]);

  if (loading) return <p>Loading...</p>;
  if (!order)
    return <p className="text-center text-xl mt-4">No order found.</p>;

  return (
    <div className="h-full w-full">
      <div className="flex items-center m-3 gap-2">
        <IoArrowBack
          className="w-10 h-10 cursor-pointer border p-2 rounded-md hover:bg-muted-foreground "
          size={30}
          onClick={() => router.back()}
        />

        <h1 className="text-xl font-semibold">Order Details</h1>
      </div>
      <div className="mx-2">
        <ShowDetails order={order} />
      </div>
    </div>
  );
};

export default Page;
