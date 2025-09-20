"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/firebase/actions/order.action";
import OrderStatusTabs from "./_components/OrderStatusTabs";
import OrdersTable from "./_components/OrdersTable";
import { Order } from "@/types/types";
import { Loader2 } from "lucide-react";
import { UserOrderSearch } from "./_components/UserOrderSearch";

export type OrderStatus = 
  | "Pending"
  | "To Ship"
  | "To Receive"
  | "Delivered"
  | "To Return/Refund"
  | "Cancelled";

export default function UsersOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("Pending");

  // Fetch all orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Calculate order counts by status
  const orderCounts = useMemo(() => {
    return orders.reduce(
      (counts, order) => {
        const status = order.status as OrderStatus;
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      },
      {} as Record<OrderStatus, number>
    );
  }, [orders]);

  // Filter orders by selected status
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="border-b bg-white dark:bg-gray-900 px-6 py-4">
        <h1 className="text-2xl font-semibold">Users Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all user orders across different statuses
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* User Order Search */}
        <UserOrderSearch />

        {/* Status Tabs */}
        <OrderStatusTabs
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          orderCounts={orderCounts}
        />

        {/* Orders Table */}
        <div>
          {filteredOrders.length > 0 ? (
            <OrdersTable orders={filteredOrders} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found with status "{selectedStatus}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
