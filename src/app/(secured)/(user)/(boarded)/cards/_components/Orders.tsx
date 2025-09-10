"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/providers/user-provider";
import Loading from "@/src/app/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Copy,
} from "lucide-react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { carouselCards } from "@/constants";

const statusConfig = {
  "pending": {
    label: "Pending Payment",
    color: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
    icon: Clock,
    description: "Waiting for payment confirmation"
  },
  "processing": {
    label: "Processing",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    icon: Package,
    description: "Payment received, processing your order"
  },
  "completed": {
    label: "Completed",
    color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
    icon: CheckCircle2,
    description: "Order has been completed"
  },
  "to-ship": {
    label: "To Ship",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    icon: Package,
    description: "Payment received, preparing for shipment"
  },
  "shipping": {
    label: "Shipping",
    color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
    icon: Truck,
    description: "Your order is on the way"
  },
  "delivered": {
    label: "Delivered",
    color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
    icon: CheckCircle2,
    description: "Order has been delivered"
  },
  "cancelled": {
    label: "Cancelled",
    color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
    icon: AlertCircle,
    description: "Order has been cancelled"
  },
};

const Orders = () => {
  const { user } = useUserContext();

  const { data: orders = [], status } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["user-orders", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User UID is undefined");

      try {
        const transactionsRef = collection(firebaseDb, "transactions");
        
        // First try with composite index
        try {
          const q = query(
            transactionsRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          
          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          return userOrders;
        } catch (indexError) {
          
          // Fallback: fetch without orderBy and sort in memory
          const q = query(
            transactionsRef,
            where("userId", "==", user.uid)
          );
          
          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt
            };
          });
          
          // Sort in memory
          userOrders.sort((a, b) => {
            const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt);
            const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt);
            return bTime.getTime() - aTime.getTime();
          });
          
          return userOrders;
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (status === "pending") return <Loading />;

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen py-4 md:py-8 gap-4">
      <div className="flex items-center justify-between px-4 md:px-16">
        <h1 className="text-xl md:text-2xl font-semibold">My Orders</h1>
        <div className="text-sm text-muted-foreground">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="px-4 md:px-14">
        {orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order: any) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Package;
              const statusInfo = statusConfig[order.status as keyof typeof statusConfig];
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          Order #{order.orderId || order.id?.slice(-8)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt?.toDate ? order.createdAt.toDate() : order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </CardDescription>
                      </div>
                      <Badge className={cn("flex items-center gap-1", statusInfo?.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo?.label || order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-sm mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {order.items?.map((item: any, index: number) => {
                          const cardDesign = carouselCards[item.id as keyof typeof carouselCards];
                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                {cardDesign?.image && (
                                  <div className="relative w-16 h-10 rounded overflow-hidden">
                                    <Image
                                      src={cardDesign.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity} • ₱{item.price}
                                  </p>
                                  {(order.status === "processing" || order.status === "completed" || order.status === "to-ship" || order.status === "shipping") ? (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Transfer code will be on the card package
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    {order.shippingInfo && (
                      <div className="pt-3 border-t">
                        <h3 className="font-medium text-sm mb-2">Shipping Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span>{order.shippingInfo.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{order.shippingInfo.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{order.shippingInfo.address}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-lg font-bold">₱{order.amount?.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Action buttons based on status */}
                    {order.status === "pending" && (
                      <div className="pt-3 border-t">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Payment Required
                              </p>
                              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                This order is waiting for payment. Please complete the payment to process your order.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {(order.paymentUrl || order.xenditPlanId) && (
                              <Button 
                                className="w-full"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    // First try to use stored payment URL
                                    if (order.paymentUrl) {
                                      window.location.href = order.paymentUrl;
                                      return;
                                    }
                                    
                                    // Fallback to API call if no stored URL
                                    const response = await fetch('/api/xendit/get-payment-url', {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        planId: order.xenditPlanId,
                                        orderId: order.id,
                                      }),
                                    });
                                    
                                    if (response.ok) {
                                      const { paymentUrl } = await response.json();
                                      if (paymentUrl) {
                                        window.location.href = paymentUrl;
                                      } else {
                                        toast.error("Payment link not available. Please contact support.");
                                      }
                                    } else {
                                      toast.error("Failed to get payment link. Please try again.");
                                    }
                                  } catch (error) {
                                    console.error("Error getting payment link:", error);
                                    toast.error("Failed to get payment link. Please try again.");
                                  }
                                }}
                              >
                                Pay Now
                              </Button>
                            )}
                            
                            {/* Temporary button for testing - remove when webhooks are enabled */}
                            {process.env.NODE_ENV === 'development' && order.status === "pending" && (
                              <Button 
                                className="w-full"
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  try {
                                    const response = await fetch('/api/xendit/update-payment-status', {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        transactionId: order.id,
                                        newStatus: 'completed',
                                      }),
                                    });
                                    
                                    if (response.ok) {
                                      toast.success("Order marked as completed. Please refresh to see updates.");
                                      // Refresh the page to see the updated status
                                      setTimeout(() => window.location.reload(), 1500);
                                    } else {
                                      toast.error("Failed to update order status.");
                                    }
                                  } catch (error) {
                                    console.error("Error updating order status:", error);
                                    toast.error("Failed to update order status.");
                                  }
                                }}
                              >
                                Mark as Paid (Test)
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="pt-3 border-t">
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                Order Cancelled
                              </p>
                              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                This order has been cancelled. If you need assistance, please contact support.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground text-center max-w-md">
              When you purchase physical cards, they will appear here so you can track their status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;