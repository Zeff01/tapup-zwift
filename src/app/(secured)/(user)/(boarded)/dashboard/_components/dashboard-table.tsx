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

interface DashboardTableProps {
  className?: string;
}

export function DashboardTable({ className }: DashboardTableProps) {
  const recentPosts = [
    {
      id: "1",
      title: "Summer Collection Launch",
      platform: "Instagram",
      engagement: "High",
      date: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SC",
    },
    {
      id: "2",
      title: "Product Tutorial Video",
      platform: "TikTok",
      engagement: "Medium",
      date: "5 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PT",
    },
    {
      id: "3",
      title: "Customer Testimonial",
      platform: "Facebook",
      engagement: "Low",
      date: "1 day ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CT",
    },
    {
      id: "4",
      title: "Industry News Update",
      platform: "Twitter",
      engagement: "Medium",
      date: "2 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "IN",
    },
    {
      id: "5",
      title: "Behind the Scenes",
      platform: "Instagram",
      engagement: "High",
      date: "3 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BS",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
        <CardDescription>
          Your most recent content across platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={post.avatar || "/placeholder.svg"}
                        alt={post.title}
                      />
                      <AvatarFallback>{post.initials}</AvatarFallback>
                    </Avatar>
                    <span>{post.title}</span>
                  </div>
                </TableCell>
                <TableCell>{post.platform}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.engagement === "High"
                        ? "bg-emerald-100 text-emerald-800"
                        : post.engagement === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {post.engagement}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
