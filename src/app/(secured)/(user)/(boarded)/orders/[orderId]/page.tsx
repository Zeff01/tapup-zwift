"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/providers/user-provider";
import { getOrdersByUserId } from "@/lib/firebase/actions/order.action";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, XCircle, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { CancelOrderModal } from "../_components/CancelOrderModal";
import { RefundRequestModal } from "../_components/RefundRequestModal";
import { generateInvoice } from "@/lib/utils/generate-invoice";

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

const getCardImage = (cardName: string): string => {
  const name = cardName.toLowerCase();
  if (name.includes('eclipse')) return '/assets/cards/Eclipse-Front.png';
  if (name.includes('aurora')) return '/assets/cards/Aurora-front.png';
  if (name.includes('bloom')) return '/assets/cards/Bloom-front.png';
  if (name.includes('viper')) return '/assets/cards/Viper-Front.png';
  if (name.includes('vortex')) return '/assets/cards/Vortex-front.png';
  return '/assets/cards/front/card1.png';
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUserContext();
  const orderId = params.orderId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["user-orders", user?.uid],
    queryFn: async () => {
      const result = await getOrdersByUserId(user?.uid || "");
      return result;
    },
    enabled: !!user?.uid,
  });

  const order = orders.find(o => o.orderId === orderId);
  const config = order ? statusConfig[order.status] || statusConfig["Pending"] : statusConfig["Pending"];
  const StatusIcon = config.icon;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 mb-4">Order not found</p>
        <Button onClick={() => router.push('/orders')} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/orders')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold">Order Details</h1>
              <p className="text-sm text-gray-500">Order #{order.orderId.slice(-8).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
        {/* Order Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{format(new Date(order.orderDate), "MMMM dd, yyyy 'at' h:mm a")}</p>
            </div>
            <div className={cn("px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2", config.bgColor, config.color)}>
              <StatusIcon className="w-4 h-4" />
              {order.status}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Order Timeline</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Order Placed</p>
                  <p className="text-xs text-gray-500">{format(new Date(order.orderDate), "MMM dd, yyyy 'at' h:mm a")}</p>
                </div>
              </div>
              {order.status !== "Pending" && (
                <div className="flex gap-3">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", config.bgColor)}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.status}</p>
                    <p className="text-xs text-gray-500">Current Status</p>
                  </div>
                </div>
              )}
              {order.cancelledAt && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Cancelled</p>
                    <p className="text-xs text-gray-500">{format(new Date(order.cancelledAt), "MMM dd, yyyy 'at' h:mm a")}</p>
                    {order.cancelReason && (
                      <p className="text-xs text-gray-400 mt-0.5">Reason: {order.cancelReason}</p>
                    )}
                  </div>
                </div>
              )}
              {order.refundStatus && (
                <div className="flex gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    order.refundStatus === "Completed" ? "bg-green-100 dark:bg-green-900/20" :
                    order.refundStatus === "Rejected" ? "bg-red-100 dark:bg-red-900/20" :
                    "bg-yellow-100 dark:bg-yellow-900/20"
                  )}>
                    <AlertCircle className={cn(
                      "w-4 h-4",
                      order.refundStatus === "Completed" ? "text-green-600" :
                      order.refundStatus === "Rejected" ? "text-red-600" :
                      "text-yellow-600"
                    )} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Refund {order.refundStatus}
                    </p>
                    {order.refundRequestedAt && (
                      <p className="text-xs text-gray-500">
                        Requested: {format(new Date(order.refundRequestedAt), "MMM dd, yyyy")}
                      </p>
                    )}
                    {order.refundCompletedAt && (
                      <p className="text-xs text-gray-500">
                        Completed: {format(new Date(order.refundCompletedAt), "MMM dd, yyyy")}
                      </p>
                    )}
                    {order.refundAmount && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Amount: ₱{order.refundAmount.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6">
          <h3 className="font-medium mb-4">Order Items ({order.items.length})</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={getCardImage(item.product?.title || '')}
                    alt={item.product?.title || 'Card'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product?.title || 'Unknown Product'}</p>
                  <p className="text-sm text-gray-500">{item.product?.description || 'No description'}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm">Quantity: {item.quantity || 1}</p>
                    <p className="text-sm font-medium">₱{(item.product?.price || 0) * (item.quantity || 1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>₱{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Fee</span>
              <span>₱{order.deliveryOption?.shippingFee || 0}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₱{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Shipping Information */}
        <Card className="p-6">
          <h3 className="font-medium mb-4">Shipping Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Recipient</span>
              <span className="text-sm font-medium">{order.shippingInfo.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Contact</span>
              <span className="text-sm font-medium">{order.shippingInfo.contactNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Address</span>
              <span className="text-sm font-medium text-right max-w-xs">
                {order.shippingInfo.address.street}, {order.shippingInfo.address.city} {order.shippingInfo.address.postalCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Delivery Method</span>
              <span className="text-sm font-medium">{order.deliveryOption?.name || 'Standard Delivery'}</span>
            </div>
          </div>
        </Card>

        {/* Order ID and Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-sm">{order.orderId}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(order.orderId, "Order ID")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy ID
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          {order.status === "Delivered" && (
            <Button variant="outline">
              Rate & Review
            </Button>
          )}
          {order.status === "Pending" && order.paymentUrl && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.location.href = order.paymentUrl!}
            >
              Continue Payment
            </Button>
          )}
          {(order.status === "Pending" || order.status === "To Ship") && (
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </Button>
          )}
          {order.status === "Cancelled" && !order.refundStatus && (
            <Button 
              variant="outline" 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setShowRefundModal(true)}
            >
              Request Refund
            </Button>
          )}
          {order.status === "Cancelled" && order.refundStatus === "Rejected" && (
            <Button 
              variant="outline" 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setShowRefundModal(true)}
            >
              Resubmit Refund Request
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => generateInvoice(order, user?.displayName || user?.firstName)}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        orderId={order.orderId}
        userId={user?.uid || ""}
      />
      
      {/* Refund Request Modal */}
      <RefundRequestModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        order={order}
        userId={user?.uid || ""}
      />
    </div>
  );
}