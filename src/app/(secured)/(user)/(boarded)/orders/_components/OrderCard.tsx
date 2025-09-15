"use client";

import React from "react";
import { Order } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  "Pending": { 
    icon: Package, 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-100",
    description: "Order is being processed"
  },
  "To Ship": { 
    icon: Package, 
    color: "text-blue-600", 
    bgColor: "bg-blue-100",
    description: "Preparing for shipment"
  },
  "To Receive": { 
    icon: Truck, 
    color: "text-purple-600", 
    bgColor: "bg-purple-100",
    description: "On the way to you"
  },
  "Delivered": { 
    icon: CheckCircle, 
    color: "text-green-600", 
    bgColor: "bg-green-100",
    description: "Order completed"
  },
  "To Return/Refund": { 
    icon: AlertCircle, 
    color: "text-orange-600", 
    bgColor: "bg-orange-100",
    description: "Return/Refund in progress"
  },
  "Cancelled": { 
    icon: XCircle, 
    color: "text-red-600", 
    bgColor: "bg-red-100",
    description: "Order cancelled"
  },
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = statusConfig[order.status] || statusConfig["Pending"];
  const StatusIcon = config.icon;

  return (
    <Card className="p-4 md:p-6">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold">{order.orderId}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">
            {format(new Date(order.orderDate), "MMM dd, yyyy")}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className={cn("p-2 rounded-full", config.bgColor)}>
          <StatusIcon className={cn("w-5 h-5", config.color)} />
        </div>
        <div className="flex-1">
          <p className="font-medium">{order.status}</p>
          <p className="text-sm text-gray-500">{config.description}</p>
        </div>
        {order.returnStatus && (
          <Badge variant="outline">{order.returnStatus}</Badge>
        )}
      </div>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.product?.image || '/assets/placeholder.png'}
                alt={item.product?.title || 'Product'}
                fill
                className="object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = '/assets/placeholder.png';
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.product?.title || 'Unknown Product'}</p>
              <p className="text-sm text-gray-500">
                {item.product?.description || 'No description'} • Qty: {item.quantity || 1}
              </p>
              <p className="text-sm font-medium">₱{item.product?.price || 0}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Info */}
      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Ship to</p>
            <p className="font-medium">{order.shippingInfo.recipientName}</p>
            <p className="text-gray-600">
              {order.shippingInfo.address.street}, {order.shippingInfo.address.city}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Delivery</p>
            <div className="flex items-center gap-2 mt-1">
              {order.deliveryOption?.image && (
                <Image
                  src={order.deliveryOption.image}
                  alt={order.deliveryOption.name}
                  width={24}
                  height={24}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <p className="font-medium">{order.deliveryOption?.name || 'Standard Delivery'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-lg font-semibold">₱{order.totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          {order.status === "Delivered" && (
            <Button variant="outline" size="sm">
              Rate & Review
            </Button>
          )}
          {(order.status === "Pending" || order.status === "To Ship") && (
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Cancel Order
            </Button>
          )}
          <Button size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;