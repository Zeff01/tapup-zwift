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
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn("border shadow-sm h-full", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                {getChartTitle(timeRange)}
              </CardTitle>
              <CardDescription>
                {getChartDescription(timeRange)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              profileViews: {
                label: "Profile Views",
                color: "#3b82f6",
              },
              vcfImports: {
                label: "VCF Downloads",
                color: "#10b981",
              },
              linkClicks: {
                label: "Link Clicks",
                color: "#8b5cf6",
              },
            }}
            className="h-[400px] w-full"
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
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
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
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                strokeDasharray="0"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="strokeDasharray"
                  from="0 1000"
                  to="1000 0"
                  dur="2s"
                  fill="freeze"
                />
              </Line>
              <Line
                type="monotone"
                dataKey="vcfImports"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                strokeDasharray="0"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="strokeDasharray"
                  from="0 1000"
                  to="1000 0"
                  dur="2s"
                  begin="0.5s"
                  fill="freeze"
                />
              </Line>
              <Line
                type="monotone"
                dataKey="linkClicks"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                strokeDasharray="0"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="strokeDasharray"
                  from="0 1000"
                  to="1000 0"
                  dur="2s"
                  begin="1s"
                  fill="freeze"
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
