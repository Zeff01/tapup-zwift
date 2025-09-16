"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, AlertCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  "Pending": { 
    icon: Package, 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  "To Ship": { 
    icon: Package, 
    color: "text-blue-600", 
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  "To Receive": { 
    icon: Truck, 
    color: "text-purple-600", 
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  "Delivered": { 
    icon: CheckCircle, 
    color: "text-green-600", 
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  "To Return/Refund": { 
    icon: AlertCircle, 
    color: "text-orange-600", 
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  "Cancelled": { 
    icon: XCircle, 
    color: "text-red-600", 
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
};

// Map card names to their image paths
const getCardImage = (cardName: string): string => {
  const name = cardName.toLowerCase();
  // Map to actual card front images
  if (name.includes('eclipse')) return '/assets/cards/Eclipse-Front.png';
  if (name.includes('aurora')) return '/assets/cards/Aurora-front.png';
  if (name.includes('bloom')) return '/assets/cards/Bloom-front.png';
  if (name.includes('viper')) return '/assets/cards/Viper-Front.png';
  if (name.includes('vortex')) return '/assets/cards/Vortex-front.png';
  
  // Fallback to numbered cards
  return '/assets/cards/front/card1.png';
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter();
  const config = statusConfig[order.status] || statusConfig["Pending"];
  const StatusIcon = config.icon;

  // Calculate total quantity
  const totalQuantity = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Card Images Section */}
        <div className="flex-shrink-0">
          <div className={cn(
            "flex",
            order.items.length === 2 ? "flex-col gap-1" : "-space-x-6"
          )}>
            {order.items.slice(0, order.items.length === 2 ? 2 : 3).map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative w-20 h-14 rounded-lg overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm",
                  order.items.length > 2 && index > 0 && "z-10"
                )}
                style={{ zIndex: order.items.length > 2 ? 3 - index : undefined }}
              >
                <Image
                  src={getCardImage(item.product?.title || '')}
                  alt={item.product?.title || 'Card'}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/cards/front/card1.png';
                  }}
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="relative w-20 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Order Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Order #{order.orderId.slice(-8).toUpperCase()}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {format(new Date(order.orderDate), "MMM dd, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1", config.bgColor, config.color)}>
              <StatusIcon className="w-3.5 h-3.5" />
              {order.status}
            </div>
          </div>

          {/* Items Summary */}
          <div className="mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {order.items.map(item => item.product?.title || 'Card').join(', ')}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} • ₱{order.totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Shipping Info - Compact */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 truncate max-w-[200px]">
              Ship to: {order.shippingInfo.recipientName}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs px-2"
              onClick={() => router.push(`/orders/${order.orderId}`)}
            >
              View Details
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;