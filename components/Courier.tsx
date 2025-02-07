import React from "react";
import { DeliveryOption } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
interface CourierProps extends DeliveryOption {
  isSelected: boolean;
  onSelect: () => void;
}
const Courier: React.FC<CourierProps> = ({
  name,
  shippingFee,
  image,
  minDays,
  maxDays,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      className={`border rounded-md flex gap-3 items-center w-full p-3 hover:bg-inputOnChangeBg ${isSelected ? "bg-inputOnChangeBg border-buttonColor" : ""}`}
      onClick={onSelect}
    >
      {/* Image */}
      <Image src={image!} alt={name!} width={44} height={22} />

      {/* details */}
      <div className="flex flex-col">
        <div className=" flex gap-2">
          <h1>{name}</h1>
          <p className="text-muted-foreground ">₱ {shippingFee}</p>
        </div>
        <div className="text-muted-foreground text-sm">
          Est. Delivery Date: {minDays} - {maxDays} days
        </div>
      </div>

      {/* Radio Button */}

      <div className="flex flex-1 justify-end">
        <input
          type="radio"
          className={`${isSelected ? "accent-buttonColor" : ""}`}
          checked={isSelected}
          onChange={onSelect}
        />
      </div>
    </button>
  );
};

export default Courier;
