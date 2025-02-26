"use client";


import { orderItems } from "@/constants";
import { urlToStatus } from "@/constants/orderStatus";
import { Order } from "@/types/types";

export type OrderStatus = Order["status"];
interface OrderStatusTabsProps {
  status: OrderStatus,
  orderCounts: Record<OrderStatus, number>;
  handleStatusChange: (newStatus: OrderStatus) => void;
}

const OrderStatusTabs: React.FC<OrderStatusTabsProps> = ({
  status,
  orderCounts,
  handleStatusChange,
}) => {
    const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "To Ship":
            return "bg-blue-500";
        case "To Receive":
            return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      case "To Return/Refund":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "";
    }
  };
  
  return (
    <div className="bg-muted items-center py-3 rounded-md overflow-x-auto mt-5 mx-4">
      <div className="flex gap-2 min-w-max px-2">
        {orderItems.map(({ title, route, icon: Icon }) => {
          const formattedStatus = urlToStatus[route] as OrderStatus; // Convert route back to OrderStatus
          const isActive = formattedStatus === status;

          return (
            <div
              key={route}
              onClick={() => handleStatusChange(formattedStatus)}
              className={`flex gap-2 items-center justify-center py-2 px-4 rounded-md cursor-pointer transition ${
                isActive ? "bg-white text-black font-bold" : "hover:bg-gray-200 text-muted-foreground"
              }`}
            >
              <Icon size={20} />
              <h5>{title}</h5>
              {orderCounts?.[formattedStatus] !== undefined && (
                <p className={`rounded-full px-2 text-sm ${getStatusClass(formattedStatus)}`}>
                  {orderCounts[formattedStatus] || 0}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTabs;