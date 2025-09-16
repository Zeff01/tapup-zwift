"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/providers/user-provider";
import { getOrdersByUserId } from "@/lib/firebase/actions/order.action";
import OrderCard from "./_components/OrderCard";
import { Order } from "@/types/types";
import { Loader2, Package } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export type OrderStatus = 
  | "Pending"
  | "To Ship"
  | "To Receive"
  | "Delivered"
  | "To Return/Refund"
  | "Cancelled";

export default function MyOrdersPage() {
  const { user } = useUserContext();

  // Debug logging
  console.log("MyOrdersPage - User:", user?.uid);

  // Fetch user's orders
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["user-orders", user?.uid],
    queryFn: async () => {
      console.log("Fetching orders for user:", user?.uid);
      const result = await getOrdersByUserId(user?.uid || "");
      console.log("Orders fetched:", result);
      return result;
    },
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Log any errors
  if (error) {
    console.error("Error fetching orders:", error);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 md:px-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold">My Orders</h1>
          <span className="text-sm text-gray-500">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Orders List */}
        <div className="space-y-3">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))
          ) : (
            <Card className="text-center py-12 px-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Start shopping to see your orders here
              </p>
              <Link
                href="/cards/card-shop"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Shop Now
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}