
"use client";

import { Order } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RenderStatusSection from "./RenderStatusSection";
import { useState } from "react";

import Modal from "@/components/Modal";

interface OrderCardProps {
  order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelClick = (e: any) => {
    if (buttonText === "Cancel Order") {
      e.preventDefault(); // Prevent default navigation
      console.log("modal", showCancelModal);
      setShowCancelModal(true);
    }
  };

  const getReturnButtonText = () => {
    if (
      order.returnStatus === "Return Rejected" &&
      pathname === "/orders/delivered/showdetails"
    ) {
      return "Track Order";
    }
    switch (pathname) {
      case "/orders/delivered":
        return "Return/Refund";

      case "/orders/to-ship":
      case "/orders/pending":
      case "/orders/pending/showdetails":
      case "/orders/to-ship/showdetails":
        return "Cancel Order";

      case "/orders/to-receive":
      case "/orders/to-receive/showdetails":
        return "Track Order";

      case "/orders/to-return-refund":
      case "/orders/to-return-refund/showdetails":
        return "Track Return";

      case "orders/cancelled":
        return "Track Cancellation";

      default:
        return null;
    }
  };

  const getButtonHref = () => {
    const hrefs = {
      "/orders/to-receive": `/orders/trackorder?orderId=${order.orderId}`,
      "/orders/delivered": "/orders/track-return",
      "/orders/to-return-refund": "/orders/track-return",
    };
    return hrefs[pathname as keyof typeof hrefs] || "#";
  };

  const formatUrl = (status?: string) =>
    status
      ? status
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "-")
      : "unknown";
  const orderStatus = formatUrl(order?.status);
  console.log("order stauts", order.status);

  const buttonText = getReturnButtonText();
  console.log("Button Text:", buttonText);

  const handleTrackOrder = () => {
    if (order?.orderId) {
      router.push(`/orders/trackorder?orderId=${order.orderId}`);
    }
  };

  return (
    <Card className=" md:p-4 mx-4">
      <CardContent className="flex flex-col gap-4 p-3">
        {pathname.includes("/orders/pending") && (
          <div className="bg-yellow-100 border border-yellow-400 p-3 rounded-md mt-4">
            <p className="md:text-lg text-yellow-700">
              To proceed with the delivery, you must first fill out the
              information needed for the cards.
            </p>
            <Link href="/cards">
              <button className="bg-greenColor hover:bg-green-400 w-full py-2 mt-2 rounded">
                Fill Out Card Info
              </button>
            </Link>
          </div>
        )}
        {<RenderStatusSection order={order} />}
        {order.items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center"
          >
            <div className="flex gap-4">
              <Image
                src={item.product.image}
                alt={item.product.title}
                width={70}
                height={40}
              />
              <div>
                <h2 className="text-sm font-medium font-inter md:text-lg">
                  {item.product.title}
                </h2>
                <p className="text-xs text-muted-foreground md:text-base">
                  ₱{item.product.price}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold lg:text-lg">
              x<span className="ml-2">{item.quantity}</span>
            </p>
          </div>
        ))}
        <div className="mt-2">
          <h2 className="text-sm font-medium font-inter md:text-xl text-primary">
            Shipping
          </h2>
          <p className="text-xs text-muted-foreground md:text-lg">
            ₱{order.deliveryOption?.shippingFee}
          </p>
          <p className="text-lg md:text-xl text-right text-muted-foreground">
            Total:{" "}
            <span className="text-green-600 font-bold">
              ₱{order.totalAmount! + order.deliveryOption?.shippingFee!}
            </span>
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {order?.status && (
            <Link
              href={`/orders/${orderStatus}/showdetails?orderId=${order.orderId}`}
              className="flex-1"
            >
              <Button variant="outline" className="w-full max-w-screen-lg">
                {`${pathname === `/orders/${orderStatus}/showdetails` ? "Contact Support" : "Show Details"}`}
              </Button>
            </Link>
          )}
          {buttonText &&
            !pathname.includes("/orders/cancelled") &&
            order.returnStatus !== "Refunded" &&
            order.returnStatus !== "Return Rejected" && (
              <div className="flex-1">
                {buttonText === "Cancel Order" ? (
                  <button
                    onClick={handleCancelClick}
                    className={`${
                      pathname.includes("/orders/to-receive") ||
                      pathname.includes("/orders/to-return-refund")
                        ? "hover:bg-orderButton dark:hover:text-primary bg-greenColor"
                        : "hover:bg-red-300 bg-[#EF4444]"
                    } max-w-screen-lg w-full py-2 px-4 text-white rounded-lg`}
                  >
                    {buttonText}
                  </button>
                ) : (
                  <Link href={getButtonHref()} className="flex-1">
                    <Button
                      className={`${
                        pathname.includes("/orders/to-receive") ||
                        pathname.includes("/orders/to-return-refund")
                          ? "hover:bg-orderButton dark:hover:text-primary bg-greenColor"
                          : "hover:bg-red-300 bg-[#EF4444]"
                      } max-w-screen-lg w-full`}
                    >
                      {buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          {pathname.includes("/orders/delivered/showdetails") &&
            order.returnStatus === "Return Rejected" && (
              <Button
                className="hover:bg-greenColor bg-orderButton flex-1  max-w-screen-lg w-full"
                onClick={() => {
                  handleTrackOrder();
                }}
              >
                Track Order
              </Button>
            )}
          {pathname.includes("/orders/cancelled/showdetails") && (
            <Button
              className="hover:bg-orderButton dark:hover:text-primary bg-greenColor flex-1  max-w-screen-lg w-full"
              onClick={() =>
                router.push(`/orders/trackreturn?orderId=${order.orderId}`)
              }
            >
              Track Cancellation
            </Button>
          )}
        </div>

        {/* Modal */}
        {showCancelModal && (
          <Modal
            isOpen={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            title="Confirmation"
          >
            <div className="p-4 text-center">
              <h2 className="text-sm md:text-lg font-semibold">
                Are you sure you want to cancel this order?
              </h2>
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    setShowCancelModal(false);
                    // Handle actual cancellation logic here
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowCancelModal(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
