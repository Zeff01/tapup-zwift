"use client";
import ComingSoon from "@/components/ComingSoon";
import { Button } from "@/components/ui/button";
import { BillingHistoryItem } from "@/types/types";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type RecentBillingProps = {
  recentBilling: BillingHistoryItem[];
};

const RecentBillingHistory = ({ recentBilling }: RecentBillingProps) => {
  const route = useRouter();
  const [visibleCount, setVisibleCount] = useState(3); // Number of visible items

  const showMore = () => {
    setVisibleCount((prev) => prev + 3); // Show 3 more items
  };

  return (
    <div className="w-full">
      {recentBilling.length === 0 ? (
        <div className="max-w-screen-md w-full mx-auto">
       
           <div className="flex items-center justify-center mt-10">
            <div className="w-full p-2 py-4 md:p-10 border border-muted flex flex-col items-center justify-center rounded-md">
              <div className="relative w-[120px] md:w-[250px] aspect-video">
                <Image src="/assets/shopImg.svg" alt="coming soon" fill className="object-cover" />
              </div>
              <h2 className="text-lg font-semibold mt-4">
                Coming Soon
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                This feature is currently under development
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm mb-10">
            Recent Billing History
          </h3>
          {recentBilling.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="flex items-center max-w-screen-md mx-auto justify-between border-b py-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <h6 className="text-sm font-medium flex items-center gap-1">
                  <span className="font-bold">1</span> {item.name}
                </h6>
              </div>
              <span className="text-sm font-semibold">{item.price}</span>
            </div>
          ))}
        </div>
      )}

      {visibleCount < recentBilling.length && (
        <div className="w-full flex items-center justify-center">
          <Button
            className="max-w-screen-md w-full mx-auto bg-buttonColor mt-2 hover:bg-green-600 text-primary text-sm"
            onClick={showMore}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentBillingHistory;
