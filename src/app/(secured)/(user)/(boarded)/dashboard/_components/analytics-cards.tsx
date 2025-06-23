"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  Download,
  ExternalLink,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Profile Views */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.profileViews.current.toLocaleString()}
          </div>
          {data.profileViews.unique && (
            <div className="text-sm text-muted-foreground mb-1">
              {data.profileViews.unique.toLocaleString()} unique viewers
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                profileViewsChange >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {profileViewsChange >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {formatPercentage(profileViewsChange)}
            </span>{" "}
            from {getTimeRangeLabel(timeRange)}
          </p>
        </CardContent>
      </Card>

      {/* VCF Imports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">VCF Downloads</CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.vcfImports.current.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                vcfImportsChange >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {vcfImportsChange >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {formatPercentage(vcfImportsChange)}
            </span>{" "}
            from {getTimeRangeLabel(timeRange)}
          </p>
        </CardContent>
      </Card>

      {/* Link Clicks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.linkClicks.total.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground space-y-1 mb-2">
            <div className="flex justify-between">
              <span>Facebook:</span>
              <span>{data.linkClicks.facebook}</span>
            </div>
            <div className="flex justify-between">
              <span>Instagram:</span>
              <span>{data.linkClicks.instagram}</span>
            </div>
            <div className="flex justify-between">
              <span>Website 1:</span>
              <span>{data.linkClicks.website1}</span>
            </div>
            <div className="flex justify-between">
              <span>Website 2:</span>
              <span>{data.linkClicks.website2}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            <span
              className={`flex items-center ${
                linkClicksChange >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {linkClicksChange >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {formatPercentage(linkClicksChange)}
            </span>{" "}
            from {getTimeRangeLabel(timeRange)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
