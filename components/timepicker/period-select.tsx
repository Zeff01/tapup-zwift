import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { Period } from "./time-picker-utils"; // Assuming the Period type is declared here

interface TimePeriodSelectProps {
  period: Period;
  setPeriod: React.Dispatch<React.SetStateAction<Period>>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  ref: React.RefObject<HTMLButtonElement>;
  onLeftFocus: () => void;
}

export const TimePeriodSelect: React.FC<TimePeriodSelectProps> = ({
  period,
  setPeriod,
  date,
  setDate,
  ref,
  onLeftFocus,
}) => {
  const togglePeriod = () => {
    // Toggle between AM and PM
    setPeriod(period === "AM" ? "PM" : "AM");
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        ref={ref}
        className="text-sm"
        onClick={togglePeriod}
        onFocus={onLeftFocus}
      >
        {period}
      </Button>
    </div>
  );
};
