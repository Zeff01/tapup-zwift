"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/providers/user-provider";
import { getOrdersByUserId } from "@/lib/firebase/actions/order.action";
import OrderStatusTabs from "./_components/OrderStatusTabs";
import OrderCard from "./_components/OrderCard";
import { Order } from "@/types/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export type OrderStatus = 
  | "Pending"
  | "To Ship"
  | "To Receive"
  | "Delivered"
  | "To Return/Refund"
  | "Cancelled";

export default function MyOrdersPage() {
  const { user } = useUserContext();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("Pending");

  // Fetch user's orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["user-orders", user?.uid],
    queryFn: () => getOrdersByUserId(user?.uid || ""),
    enabled: !!user?.uid,
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
      <div className="border-b bg-white dark:bg-gray-900 px-4 py-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-semibold">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your orders and manage returns
        </p>
      </div>

      <div className="p-4 md:p-6">
        {/* Status Tabs */}
        <OrderStatusTabs
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          orderCounts={orderCounts}
        />

        {/* Orders List */}
        <div className="mt-6 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start shopping to see your orders here
              </p>
              <Link
                href="/cards/card-shop"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No orders found with status "{selectedStatus}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}