import React from "react";
import { Card } from "@/types/types";
import { Eye, Download, MousePointer, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  totalViews: number;
  uniqueViews: number;
  totalVcfDownloads: number;
  totalLinkClicks: number;
}

interface AnalyticsCardProps {
  card: Partial<Card>;
  analytics?: AnalyticsData | null;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  card,
  analytics,
  className
}) => {
  // Show default values if no analytics data
  const defaultAnalytics = {
    totalViews: 0,
    uniqueViews: 0,
    totalVcfDownloads: 0,
    totalLinkClicks: 0
  };

  const data = analytics || defaultAnalytics;

  const stats = [
    {
      icon: Eye,
      label: "Views",
      value: data.totalViews,
      subValue: `${data.uniqueViews} unique`,
      color: "text-blue-600"
    },
    {
      icon: Download,
      label: "Downloads",
      value: data.totalVcfDownloads,
      color: "text-green-600"
    },
    {
      icon: MousePointer,
      label: "Link Clicks",
      value: data.totalLinkClicks,
      color: "text-purple-600"
    }
  ];

  return (
    <div className={cn("px-4 py-3", className)}>
      <div className="flex items-center justify-between gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2 flex-1">
            <div className={cn("p-1.5 rounded-full bg-opacity-10", stat.color, 
              stat.color === "text-blue-600" && "bg-blue-600",
              stat.color === "text-green-600" && "bg-green-600",
              stat.color === "text-purple-600" && "bg-purple-600"
            )}>
              <stat.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};