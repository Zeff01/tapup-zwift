"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../page";

interface OrderStatusTabsProps {
  selectedStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  orderCounts: Record<OrderStatus, number>;
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  "All": { label: "All", color: "bg-gray-100 text-gray-800" },
  "Pending": { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  "To Ship": { label: "To Ship", color: "bg-blue-100 text-blue-800" },
  "To Receive": { label: "To Receive", color: "bg-purple-100 text-purple-800" },
  "Delivered": { label: "Delivered", color: "bg-green-100 text-green-800" },
  "To Return/Refund": { label: "Returns", color: "bg-orange-100 text-orange-800" },
  "Cancelled": { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

const OrderStatusTabs: React.FC<OrderStatusTabsProps> = ({
  selectedStatus,
  onStatusChange,
  orderCounts,
}) => {
  const statuses = Object.keys(statusConfig) as OrderStatus[];

  return (
    <div className="border-b overflow-x-auto">
      <div className="flex space-x-4 md:space-x-8 min-w-max">
        {statuses.map((status) => {
          const count = orderCounts[status] || 0;
          const config = statusConfig[status];
          const isActive = selectedStatus === status;

          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={cn(
                "pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="flex items-center gap-2">
                {config.label}
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "ml-1 px-2 py-0 text-xs",
                      isActive ? config.color : ""
                    )}
                  >
                    {count}
                  </Badge>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTabs;