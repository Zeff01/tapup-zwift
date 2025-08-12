"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  Download,
  ExternalLink,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimeRange = "daily" | "weekly" | "monthly";

interface AnalyticsData {
  profileViews: {
    current: number;
    previous: number;
    unique?: number;
  };
  vcfImports: {
    current: number;
    previous: number;
  };
  linkClicks: {
    facebook: number;
    instagram: number;
    website1: number;
    website2: number;
    total: number;
    previous: number;
  };
}

interface AnalyticsCardsProps {
  data: AnalyticsData;
  timeRange: TimeRange;
}

export function AnalyticsCards({ data, timeRange }: AnalyticsCardsProps) {
  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case "daily":
        return "yesterday";
      case "weekly":
        return "last week";
      case "monthly":
        return "last month";
    }
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatPercentage = (percentage: number) => {
    const abs = Math.abs(percentage);
    return `${percentage >= 0 ? "+" : "-"}${abs.toFixed(1)}%`;
  };

  const profileViewsChange = calculatePercentageChange(
    data.profileViews.current,
    data.profileViews.previous
  );
  const vcfImportsChange = calculatePercentageChange(
    data.vcfImports.current,
    data.vcfImports.previous
  );
  const linkClicksChange = calculatePercentageChange(
    data.linkClicks.total,
    data.linkClicks.previous
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      {/* Profile Views */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border shadow-sm hover:shadow-md transition-all duration-300 h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {data.profileViews.current.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium flex items-center gap-1",
                    profileViewsChange >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {profileViewsChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(profileViewsChange)}
                </span>
              </div>
              {data.profileViews.unique && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">
                    {data.profileViews.unique.toLocaleString()}
                  </span>{" "}
                  unique viewers
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Compared to {getTimeRangeLabel(timeRange)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* VCF Imports */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border shadow-sm hover:shadow-md transition-all duration-300 h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VCF Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {data.vcfImports.current.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium flex items-center gap-1",
                    vcfImportsChange >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {vcfImportsChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(vcfImportsChange)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Compared to {getTimeRangeLabel(timeRange)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Link Clicks */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border shadow-sm hover:shadow-md transition-all duration-300 h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {data.linkClicks.total.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium flex items-center gap-1",
                    linkClicksChange >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {linkClicksChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(linkClicksChange)}
                </span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Facebook:</span>
                  <span className="font-medium text-foreground">
                    {data.linkClicks.facebook}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Instagram:</span>
                  <span className="font-medium text-foreground">
                    {data.linkClicks.instagram}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Website 1:</span>
                  <span className="font-medium text-foreground">
                    {data.linkClicks.website1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Website 2:</span>
                  <span className="font-medium text-foreground">
                    {data.linkClicks.website2}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Compared to {getTimeRangeLabel(timeRange)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
