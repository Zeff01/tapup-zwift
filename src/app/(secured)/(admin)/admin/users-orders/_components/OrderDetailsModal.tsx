"use client";

import React from "react";
import { Order } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Package, Truck, CreditCard, Calendar } from "lucide-react";

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "To Ship": "bg-blue-100 text-blue-800",
  "To Receive": "bg-purple-100 text-purple-800",
  "Delivered": "bg-green-100 text-green-800",
  "To Return/Refund": "bg-orange-100 text-orange-800",
  "Cancelled": "bg-red-100 text-red-800",
};

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  open,
  onOpenChange,
}) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Order Details
          </DialogTitle>
          <DialogDescription>
            Order ID: {order.orderId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Order Status and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className={cn(statusColors[order.status] || "")}
              >
                {order.status}
              </Badge>
              {order.returnStatus && (
                <Badge variant="outline" className="text-xs">
                  {order.returnStatus}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {format(new Date(order.orderDate), "MMM dd, yyyy 'at' h:mm a")}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{order.shippingInfo.recipientName}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact Number</p>
                <p className="font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {order.shippingInfo.contactNumber}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Shipping Address
            </h3>
            <div className="text-sm">
              <p>{order.shippingInfo.address.street}</p>
              {order.shippingInfo.address.unit && (
                <p>Unit: {order.shippingInfo.address.unit}</p>
              )}
              <p>
                {order.shippingInfo.address.city},{" "}
                {order.shippingInfo.address.postalCode}
              </p>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900"
                >
                  {item.product.image && (
                    <div className="relative w-20 h-28 overflow-hidden rounded-lg shadow-sm flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">{item.product.title}</h4>
                    <p className="text-sm text-gray-500">
                      {item.product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₱{item.product.price.toFixed(2)}
                      </span>
                    </div>
                    {item.subscriptionPlan && (
                      <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        <p className="font-medium text-blue-700 dark:text-blue-300">
                          Subscription: {item.subscriptionPlan.interval}
                        </p>
                        <p className="text-blue-600 dark:text-blue-400">
                          ₱{item.subscriptionPlan.price.toFixed(2)} / {item.subscriptionPlan.interval}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Delivery Information
            </h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {order.deliveryOption.image && (
                  <Image
                    src={order.deliveryOption.image}
                    alt={order.deliveryOption.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
                <div>
                  <p className="font-medium">{order.deliveryOption.name}</p>
                  <p className="text-gray-500">
                    {order.deliveryOption.minDays}-{order.deliveryOption.maxDays} days
                  </p>
                </div>
              </div>
              <p className="font-medium">₱{order.deliveryOption.shippingFee.toFixed(2)}</p>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₱{(order.totalAmount - order.deliveryOption.shippingFee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Fee</span>
                <span>₱{order.deliveryOption.shippingFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total Amount</span>
                <span>₱{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};