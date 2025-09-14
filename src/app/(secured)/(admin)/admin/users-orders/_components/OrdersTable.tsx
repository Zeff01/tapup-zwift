"use client";

import React from "react";
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
import { Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
                  <p className="text-sm text-gray-500">{order.shippingInfo.contactNumber}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* Show first item image */}
                  {order.items[0]?.product.image && (
                    <div className="relative w-10 h-10">
                      <Image
                        src={order.items[0].product.image}
                        alt={order.items[0].product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <span className="text-sm">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
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
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="Edit Order"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    title="Delete Order"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;