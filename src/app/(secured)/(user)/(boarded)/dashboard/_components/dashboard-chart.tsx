"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface DashboardChartProps {
  className?: string;
}

export function DashboardChart({ className }: DashboardChartProps) {
  const data = [
    { name: "Jan", likes: 400, comments: 240, shares: 180 },
    { name: "Feb", likes: 300, comments: 198, shares: 120 },
    { name: "Mar", likes: 520, comments: 350, shares: 250 },
    { name: "Apr", likes: 450, comments: 290, shares: 190 },
    { name: "May", likes: 600, comments: 480, shares: 320 },
    { name: "Jun", likes: 580, comments: 390, shares: 290 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
        <CardDescription>
          Monthly engagement metrics across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            likes: {
              label: "Likes",
              color: "hsl(var(--chart-1))",
            },
            comments: {
              label: "Comments",
              color: "hsl(var(--chart-2))",
            },
            shares: {
              label: "Shares",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="aspect-[4/3]"
        >
          <BarChart
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
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
              dataKey="likes"
              fill="var(--color-likes)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="comments"
              fill="var(--color-comments)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="shares"
              fill="var(--color-shares)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
