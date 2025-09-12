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
  if (!analytics) {
    return null;
  }

  const stats = [
    {
      icon: Eye,
      label: "Views",
      value: analytics.totalViews || 0,
      subValue: `${analytics.uniqueViews || 0} unique`,
      color: "text-blue-600"
    },
    {
      icon: Download,
      label: "Downloads",
      value: analytics.totalVcfDownloads || 0,
      color: "text-green-600"
    },
    {
      icon: MousePointer,
      label: "Link Clicks",
      value: analytics.totalLinkClicks || 0,
      color: "text-purple-600"
    }
  ];

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700", className)}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={cn("flex justify-center mb-1", stat.color)}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
            {stat.subValue && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {stat.subValue}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};