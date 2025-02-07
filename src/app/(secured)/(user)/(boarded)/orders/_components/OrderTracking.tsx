"use client";

import { Copy } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface TrackingStep {
  time: string;
  text: string;
  active?: boolean;
}

interface OrderTrackingProps {
  estimatedDelivery: string;
  courierName: string;
  trackingNumber: string;
  logoUrl: string;
  trackingSteps: TrackingStep[];
  status: string;
}

export default function OrderTracking({
  courierName,
  trackingNumber,
  logoUrl,
  trackingSteps,
}: OrderTrackingProps) {
  const copyTrackingNumber = () => {
    navigator.clipboard
      .writeText(trackingNumber)
      .then(() => toast.success("Tracking number copied!"))
      .catch((err) => toast.error("Failed to copy: ", err));
  };

  return (
    <div className="">
      {/* Order Details */}
      <div className="mt-6 p-3 border rounded-lg">
        <div className="flex justify-between items-center space-x-2">
          <div className="flex gap-4 items-center">
            <Image
              src={logoUrl} // Placeholder for courier logo
              alt="Courier Logo"
              width={100}
              height={100}
              className="rounded-sm"
            />
            <div>
              <p className="font-semibold md:text-xl">{courierName}</p>
              <p className="text-sm text-muted-foreground">{trackingNumber}</p>
            </div>
          </div>
          <div className="">
            <Copy
              className="w-12 h-12 px-2 rounded-md cursor-pointer border  text-[#525252]"
              onClick={copyTrackingNumber}
            />
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="flex gap-3 mt-4 max-w-screen-lg w-full">
          <div className="flex flex-col gap-3 border-gray-300">
            {trackingSteps.map((step, index) => (
              <div key={index} className="relative flex items-start h-full">
                {/* Timeline column */}
                <div className="relative w-16 md:w-20 h-full flex-shrink-0">
                  {/* Time */}
                  <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
                    {step.time}
                  </p>

                  {/* Dot */}
                  <div
                    className={`absolute left-[90%] top-2 -translate-x-[50%] w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      step.active ? "bg-greenColor" : "bg-muted-foreground"
                    }`}
                  />

                  {/* Vertical line */}
                  {index !== trackingSteps.length - 1 && (
                    <div className="absolute left-[90%] top-4 md:top-5 -translate-x-1/2 w-0.5 h-[calc(100%)] bg-gray-200" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6 pl-4">
                  <h2
                    className={`text-sm md:text-lg lg:text-xl ${
                      step.active
                        ? "text-greenColor font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.text}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
