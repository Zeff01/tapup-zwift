"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type TimeRange = "daily" | "weekly" | "monthly";

interface ChartDataPoint {
  date: string;
  profileViews: number;
  vcfImports: number;
  linkClicks: number;
}

interface AnalyticsChartProps {
  className?: string;
  data: ChartDataPoint[];
  timeRange: TimeRange;
}

export function AnalyticsChart({
  className,
  data,
  timeRange,
}: AnalyticsChartProps) {
  const getChartTitle = (range: TimeRange) => {
    switch (range) {
      case "daily":
        return "Daily Analytics Overview";
      case "weekly":
        return "Weekly Analytics Overview";
      case "monthly":
        return "Monthly Analytics Overview";
    }
  };

  const getChartDescription = (range: TimeRange) => {
    switch (range) {
      case "daily":
        return "Profile views, VCF downloads, and link clicks over the past 30 days";
      case "weekly":
        return "Profile views, VCF downloads, and link clicks over the past 12 weeks";
      case "monthly":
        return "Profile views, VCF downloads, and link clicks over the past 12 months";
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{getChartTitle(timeRange)}</CardTitle>
        <CardDescription>{getChartDescription(timeRange)}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            profileViews: {
              label: "Profile Views",
              color: "hsl(var(--chart-1))",
            },
            vcfImports: {
              label: "VCF Downloads",
              color: "hsl(var(--chart-2))",
            },
            linkClicks: {
              label: "Link Clicks",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="aspect-[4/3]"
        >
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="profileViews"
              stroke="var(--color-profileViews)"
              strokeWidth={2}
              dot={{ fill: "var(--color-profileViews)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="vcfImports"
              stroke="var(--color-vcfImports)"
              strokeWidth={2}
              dot={{ fill: "var(--color-vcfImports)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="linkClicks"
              stroke="var(--color-linkClicks)"
              strokeWidth={2}
              dot={{ fill: "var(--color-linkClicks)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
