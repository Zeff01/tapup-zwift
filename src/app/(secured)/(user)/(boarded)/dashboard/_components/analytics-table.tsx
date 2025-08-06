"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Facebook,
  Instagram,
  Globe,
  ExternalLink,
  Eye,
  Download,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimeRange = "daily" | "weekly" | "monthly";

interface ActivityItem {
  id: string;
  type: "profile_view" | "vcf_download" | "link_click";
  platform?: "facebook" | "instagram" | "website1" | "website2";
  timestamp: string;
  location?: string;
  deviceType?: "mobile" | "desktop" | "tablet";
}

interface AnalyticsTableProps {
  className?: string;
  activities: ActivityItem[];
  timeRange: TimeRange;
}

export function AnalyticsTable({
  className,
  activities,
  timeRange,
}: AnalyticsTableProps) {
  const getActivityIcon = (type: ActivityItem["type"], platform?: string) => {
    switch (type) {
      case "profile_view":
        return <Eye className="h-4 w-4" />;
      case "vcf_download":
        return <Download className="h-4 w-4" />;
      case "link_click":
        switch (platform) {
          case "facebook":
            return <Facebook className="h-4 w-4" />;
          case "instagram":
            return <Instagram className="h-4 w-4" />;
          case "website1":
          case "website2":
            return <Globe className="h-4 w-4" />;
          default:
            return <ExternalLink className="h-4 w-4" />;
        }
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getActivityLabel = (activity: ActivityItem) => {
    switch (activity.type) {
      case "profile_view":
        return "Profile View";
      case "vcf_download":
        return "VCF Download";
      case "link_click":
        switch (activity.platform) {
          case "facebook":
            return "Facebook Click";
          case "instagram":
            return "Instagram Click";
          case "website1":
            return "Website 1 Click";
          case "website2":
            return "Website 2 Click";
          default:
            return "Link Click";
        }
      default:
        return "Unknown Activity";
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "profile_view":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "vcf_download":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "link_click":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getTimeRangeTitle = (range: TimeRange) => {
    switch (range) {
      case "daily":
        return "Recent Activity (Today)";
      case "weekly":
        return "Recent Activity (This Week)";
      case "monthly":
        return "Recent Activity (This Month)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn("border shadow-sm h-full flex flex-col", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                {getTimeRangeTitle(timeRange)}
              </CardTitle>
              <CardDescription>
                Latest interactions with your profile and links
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="overflow-auto h-full max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Activity</TableHead>
                  <TableHead className="font-medium">Platform</TableHead>
                  <TableHead className="font-medium">Device</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity, index) => (
                  <motion.tr
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getActivityIcon(activity.type, activity.platform)}
                        <span className="text-sm">
                          {getActivityLabel(activity)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          getActivityColor(activity.type)
                        )}
                      >
                        {activity.platform
                          ? activity.platform.charAt(0).toUpperCase() +
                            activity.platform.slice(1)
                          : "Direct"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        {getDeviceIcon(activity.deviceType)}
                        <span className="capitalize">
                          {activity.deviceType || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {activity.location || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground text-right">
                      {formatTimestamp(activity.timestamp)}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
