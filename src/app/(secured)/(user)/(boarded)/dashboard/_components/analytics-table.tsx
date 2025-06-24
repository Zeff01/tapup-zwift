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
} from "lucide-react";

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
        return "bg-blue-100 text-blue-800";
      case "vcf_download":
        return "bg-green-100 text-green-800";
      case "link_click":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <Card className={className}>
      <CardHeader>
        <CardTitle>{getTimeRangeTitle(timeRange)}</CardTitle>
        <CardDescription>
          Latest interactions with your profile and links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type, activity.platform)}
                    <span>{getActivityLabel(activity)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getActivityColor(activity.type)}
                  >
                    {activity.platform
                      ? activity.platform.charAt(0).toUpperCase() +
                        activity.platform.slice(1)
                      : "Direct"}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">
                  {activity.deviceType || "Unknown"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.location || "Unknown"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
