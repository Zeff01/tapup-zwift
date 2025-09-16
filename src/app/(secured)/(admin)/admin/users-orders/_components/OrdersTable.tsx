"use client";

import React, { useState } from "react";
import { Order } from "@/types/types";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, MoreVertical, Check, Package, Truck, PackageCheck, XCircle, RotateCcw } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateOrderStatus } from "@/lib/firebase/actions/order.action";
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { OrderDetailsModal } from "./OrderDetailsModal";

interface OrdersTableProps {
  orders: Order[];
}

const statusColors: Record<string, string> = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "To Ship": "bg-blue-100 text-blue-800",
  "To Receive": "bg-purple-100 text-purple-800",
  "Delivered": "bg-green-100 text-green-800",
  "To Return/Refund": "bg-orange-100 text-orange-800",
  "Cancelled": "bg-red-100 text-red-800",
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const queryClient = useQueryClient();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: Order["status"] }) => {
      setUpdatingOrderId(orderId);
      const success = await updateOrderStatus(orderId, status);
      if (!success) throw new Error("Failed to update order status");
      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated successfully");
      setUpdatingOrderId(null);
    },
    onError: (error) => {
      toast.error("Failed to update order status");
      console.error(error);
      setUpdatingOrderId(null);
    },
  });

  const getNextStatuses = (currentStatus: Order["status"]): Order["status"][] => {
    switch (currentStatus) {
      case "Pending":
        return ["To Ship", "Cancelled"];
      case "To Ship":
        return ["To Receive", "Cancelled"];
      case "To Receive":
        return ["Delivered", "To Return/Refund"];
      case "Delivered":
        return ["To Return/Refund"];
      case "To Return/Refund":
        return ["Cancelled"];
      default:
        return [];
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "To Ship":
        return <Package className="w-4 h-4 mr-2" />;
      case "To Receive":
        return <Truck className="w-4 h-4 mr-2" />;
      case "Delivered":
        return <PackageCheck className="w-4 h-4 mr-2" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4 mr-2" />;
      case "To Return/Refund":
        return <RotateCcw className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery Option</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell className="font-medium">{order.orderId}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{order.shippingInfo.recipientName}</p>
                  {order.shippingInfo.contactNumber && (
                    <p className="text-sm text-gray-500">{order.shippingInfo.contactNumber}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {/* Show first item image with proper card ratio */}
                  {order.items[0]?.product?.image && (
                    <div className="relative w-16 h-24 overflow-hidden rounded-lg shadow-sm">
                      <Image
                        src={order.items[0].product.image}
                        alt={order.items[0].product.title || "Product image"}
                        fill
                        className="object-contain"
                        sizes="64px"
                        onError={(e) => {
                          console.error(`Failed to load image for order ${order.orderId}:`, order.items[0].product.image);
                          console.error(`Product title: ${order.items[0].product.title}`);
                          // Replace with placeholder image
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/profile_placeholder.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </span>
                    {order.items[0]?.product?.title && (
                      <span className="text-xs text-gray-500 truncate max-w-[150px]">
                        {order.items[0].product.title}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>₱{order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                {format(new Date(order.orderDate), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(statusColors[order.status] || "")}
                >
                  {order.status}
                </Badge>
                {order.returnStatus && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs"
                  >
                    {order.returnStatus}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
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
                  <span className="text-sm">{order.deliveryOption.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {/* Status Update Dropdown */}
                  {getNextStatuses(order.status).length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          disabled={updatingOrderId === order.orderId}
                        >
                          {updatingOrderId === order.orderId ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <>
                              <MoreVertical className="h-4 w-4 mr-1" />
                              <span className="text-xs">Update Status</span>
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Change Status To</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {getNextStatuses(order.status).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateStatusMutation.mutate({ orderId: order.orderId, status })}
                            className="cursor-pointer"
                          >
                            {getStatusIcon(status)}
                            <span>{status}</span>
                            {order.status === status && (
                              <Check className="w-4 h-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="View Details"
                    onClick={() => {
                      setSelectedOrder(order);
                      setDetailsModalOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  );
};

export default OrdersTable;