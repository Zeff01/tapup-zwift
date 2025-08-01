"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, CalendarDays, CalendarRange } from "lucide-react";

type TimeRange = "daily" | "weekly" | "monthly";

interface AnalyticsTimeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export function AnalyticsTimeSelector({
  selectedRange,
  onRangeChange,
}: AnalyticsTimeSelectorProps) {
  const ranges: { value: TimeRange; label: string; icon: any }[] = [
    { value: "daily", label: "Daily", icon: Calendar },
    { value: "weekly", label: "Weekly", icon: CalendarDays },
    { value: "monthly", label: "Monthly", icon: CalendarRange },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1 rounded-lg bg-muted p-1"
    >
      {ranges.map((range) => {
        const Icon = range.icon;
        return (
          <Button
            key={range.value}
            variant="ghost"
            size="sm"
            onClick={() => onRangeChange(range.value)}
            className={cn(
              "h-8 px-3 text-sm font-medium transition-all gap-1.5",
              selectedRange === range.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {range.label}
          </Button>
        );
      })}
    </motion.div>
  );
}
