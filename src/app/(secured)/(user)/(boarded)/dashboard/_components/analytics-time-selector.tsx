"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeRange = "daily" | "weekly" | "monthly";

interface AnalyticsTimeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function AnalyticsTimeSelector({
  selectedRange,
  onRangeChange,
}: AnalyticsTimeSelectorProps) {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  return (
    <div className="flex items-center space-x-1 rounded-lg bg-muted p-1">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant="ghost"
          size="sm"
          onClick={() => onRangeChange(range.value)}
          className={cn(
            "h-8 px-3 text-sm font-medium transition-all",
            selectedRange === range.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
