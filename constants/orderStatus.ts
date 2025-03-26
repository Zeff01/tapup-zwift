import { OrderStatus } from "@/src/app/(secured)/(user)/(boarded)/orders/_components/OrderStatus";

export const statusToUrl: Record<OrderStatus, string> = {
  Pending: "pending",
  "To Ship": "to-ship",
  "To Receive": "to-receive",
  Delivered: "delivered",
  "To Return/Refund": "to-return-refund",
  Cancelled: "cancelled",
};

export const urlToStatus: Record<string, OrderStatus> = {
  pending: "Pending",
  "to-ship": "To Ship",
  "to-receive": "To Receive",
  delivered: "Delivered",
  "to-return-refund": "To Return/Refund",
  cancelled: "Cancelled",
};
