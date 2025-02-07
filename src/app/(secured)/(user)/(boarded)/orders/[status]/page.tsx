"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import OrderStatusTabs, { OrderStatus } from "../_components/OrderStatusTab";
import OrderCard from "../_components/OrderCard";
import {  statusToUrl, urlToStatus } from "@/constants/orderStatus";
import { exampleOrders } from "@/constants/exampleOrder";



interface OrdersPageProps {
  params: { status: string };
}

const OrdersPage: React.FC<OrdersPageProps> = ({ params }) => {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>("Pending");

  // Format and update status on param change
  useEffect(() => {
    if (params.status) {
      const formattedStatus = urlToStatus[params.status.toLowerCase()] || "Pending";
      setStatus(formattedStatus);
    }
  }, [params.status]);

  // Memoized order counts
  const orderCounts = useMemo(() => {
    return exampleOrders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {} as Record<OrderStatus, number>);
  }, []);

  // Filtered orders based on current status
  const filteredOrders = useMemo(() => {
    return exampleOrders.filter((order) => order.status === status);
  }, [status]);

  // Handle status change
  const handleStatusChange = (newStatus: OrderStatus) => {
    setStatus(newStatus);
    router.push(`/orders/${statusToUrl[newStatus]}`, { scroll: false });
  };



  return (
    <div className="h-full max-w-screen-xl">
      <div className="w-full border-b shadow-sm p-4 hidden lg:block">
        <h1 className=" text-xl font-semibold">Orders</h1>
      </div>

      {/* Status Tabs */}
      <OrderStatusTabs
        status={status}
        orderCounts={orderCounts}
        handleStatusChange={handleStatusChange}
      />

      {/* Order List */}
      <div className="space-y-4 mt-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
