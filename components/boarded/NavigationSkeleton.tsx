import React from "react";
import { Skeleton } from "../ui/skeleton";

const NavigationSkeleton = () => {
  return (
    <React.Fragment>
      <div className="relative border p-1 rounded-full outline-white outline-2 flex items-center gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[180px]" />
              <Skeleton className="h-3 w-[140px]" />
            </div>
          </div>
          <div className="flex gap-3 mr-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex-1 pb-12 flex flex-col mt-4 md:mt-12 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={`skeleton-navbar-${i}`}
            className="rounded-sm h-[40px] md:h-[50px] w-full"
          />
        ))}
        <Skeleton className="rounded-sm h-[40px] md:h-[50px] w-full mt-auto" />
      </div>
    </React.Fragment>
  );
};

export default NavigationSkeleton;
