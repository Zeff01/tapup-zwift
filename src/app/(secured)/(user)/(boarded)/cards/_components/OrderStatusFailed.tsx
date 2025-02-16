"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Error from "@/public/assets/error.png";

const OrderFailed = () => {
  return (
    <div className=" flex flex-col max-w-sm w-full overflow-auto my-2 ">
      <div className="w-full border gap-3 rounded-md p-4 flex flex-col justify-center items-center">
        <Image src={Error} alt="Pending Clock" width={50} height={50} />
        <h1 className="text-2xl font-bold">Something went Wrong</h1>
        <p className="text-muted-foreground text-center">
          Payment getaway is not yet implemented
        </p>
      </div>

      <Link href="/cards/cardShop">
        <Button className="w-full my-4" variant={"default"}>
          Go Back To Shop
        </Button>
      </Link>
    </div>
  );
};
export default OrderFailed;
