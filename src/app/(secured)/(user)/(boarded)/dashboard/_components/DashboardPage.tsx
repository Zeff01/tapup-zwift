"use client";

import { useState } from "react";
import { AnalyticsTimeSelector } from "./analytics-time-selector";
import { AnalyticsCards } from "./analytics-cards";
import { AnalyticsChart } from "./analytics-chart";
import { AnalyticsTable } from "./analytics-table";

type TimeRange = "daily" | "weekly" | "monthly";

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRange>("daily");

  // Mock data - replace with actual API calls
  const getMockAnalyticsData = (timeRange: TimeRange) => {
    switch (timeRange) {
      case "daily":
        return {
          profileViews: { current: 247, previous: 198, unique: 189 },
          vcfImports: { current: 34, previous: 28 },
          linkClicks: {
            facebook: 12,
            instagram: 23,
            website1: 8,
            website2: 5,
            total: 48,
            previous: 41,
          },
        };
      case "weekly":
        return {
          profileViews: { current: 1543, previous: 1298, unique: 1156 },
          vcfImports: { current: 187, previous: 154 },
          linkClicks: {
            facebook: 78,
            instagram: 134,
            website1: 45,
            website2: 29,
            total: 286,
            previous: 243,
          },
        };
      case "monthly":
        return {
          profileViews: { current: 6789, previous: 5432, unique: 4987 },
          vcfImports: { current: 823, previous: 697 },
          linkClicks: {
            facebook: 345,
            instagram: 567,
            website1: 198,
            website2: 123,
            total: 1233,
            previous: 1087,
          },
        };
    }
  };

  const getMockChartData = (timeRange: TimeRange) => {
    switch (timeRange) {
      case "daily":
        return Array.from({ length: 30 }, (_, i) => ({
          date: new Date(
            Date.now() - (29 - i) * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          profileViews: Math.floor(Math.random() * 50) + 100,
          vcfImports: Math.floor(Math.random() * 10) + 5,
          linkClicks: Math.floor(Math.random() * 20) + 10,
        }));
      case "weekly":
        return Array.from({ length: 12 }, (_, i) => ({
          date: `Week ${i + 1}`,
          profileViews: Math.floor(Math.random() * 300) + 700,
          vcfImports: Math.floor(Math.random() * 50) + 25,
          linkClicks: Math.floor(Math.random() * 100) + 50,
        }));
      case "monthly":
        return [
          { date: "Jan", profileViews: 2400, vcfImports: 240, linkClicks: 180 },
          { date: "Feb", profileViews: 1800, vcfImports: 198, linkClicks: 120 },
          { date: "Mar", profileViews: 3200, vcfImports: 350, linkClicks: 250 },
          { date: "Apr", profileViews: 2900, vcfImports: 290, linkClicks: 190 },
          { date: "May", profileViews: 4100, vcfImports: 480, linkClicks: 320 },
          { date: "Jun", profileViews: 3800, vcfImports: 390, linkClicks: 290 },
          { date: "Jul", profileViews: 4500, vcfImports: 420, linkClicks: 340 },
          { date: "Aug", profileViews: 3900, vcfImports: 380, linkClicks: 280 },
          { date: "Sep", profileViews: 4200, vcfImports: 410, linkClicks: 310 },
          { date: "Oct", profileViews: 4800, vcfImports: 450, linkClicks: 360 },
          { date: "Nov", profileViews: 5200, vcfImports: 480, linkClicks: 390 },
          { date: "Dec", profileViews: 6789, vcfImports: 523, linkClicks: 433 },
        ];
    }
  };

  const getMockActivities = (timeRange: TimeRange) => {
    const activities = [
      {
        id: "1",
        type: "profile_view" as const,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        location: "Manila, Philippines",
        deviceType: "mobile" as const,
      },
      {
        id: "2",
        type: "link_click" as const,
        platform: "facebook" as const,
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        location: "Cebu, Philippines",
        deviceType: "desktop" as const,
      },
      {
        id: "3",
        type: "vcf_download" as const,
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        location: "Davao, Philippines",
        deviceType: "mobile" as const,
      },
      {
        id: "4",
        type: "link_click" as const,
        platform: "instagram" as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        location: "Quezon City, Philippines",
        deviceType: "tablet" as const,
      },
      {
        id: "5",
        type: "profile_view" as const,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        location: "Makati, Philippines",
        deviceType: "desktop" as const,
      },
    ];

    return activities.slice(
      0,
      timeRange === "daily" ? 5 : timeRange === "weekly" ? 10 : 15
    );
  };

  const analyticsData = getMockAnalyticsData(selectedTimeRange);
  const chartData = getMockChartData(selectedTimeRange);
  const activities = getMockActivities(selectedTimeRange);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-4 h-full">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <AnalyticsTimeSelector
            selectedRange={selectedTimeRange}
            onRangeChange={setSelectedTimeRange}
          />
        </div>

        <AnalyticsCards data={analyticsData} timeRange={selectedTimeRange} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7">
          <AnalyticsChart
            className="lg:col-span-4"
            data={chartData}
            timeRange={selectedTimeRange}
          />
          <AnalyticsTable
            className="lg:col-span-3"
            activities={activities}
            timeRange={selectedTimeRange}
          />
        </div>
      </main>
    </div>
  );
}
