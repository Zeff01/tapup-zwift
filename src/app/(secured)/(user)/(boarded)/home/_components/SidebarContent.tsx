"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Plus,
  QrCode,
  Share2,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Eye,
  Heart,
  MessageCircle,
  Zap,
  Target,
  Gift,
} from "lucide-react";

// Dummy data
const quickActions = [
  { icon: QrCode, label: "Share Your Card", color: "bg-blue-500" },
  { icon: Plus, label: "Create Post", color: "bg-green-500" },
  { icon: Users, label: "Find Connections", color: "bg-purple-500" },
  { icon: Share2, label: "Invite Friends", color: "bg-orange-500" },
];

const recentConnections = [
  {
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    position: "Product Manager",
    company: "InnovateCorp",
    tapLocation: "Tech Conference",
    timeAgo: "2 hours ago",
  },
  {
    name: "Lisa Wang",
    avatar: "/api/placeholder/32/32",
    position: "Data Scientist",
    company: "DataFlow",
    tapLocation: "Coffee Shop",
    timeAgo: "1 day ago",
  },
  {
    name: "Michael Brown",
    avatar: "/api/placeholder/32/32",
    position: "Designer",
    company: "CreativeStudio",
    tapLocation: "Design Meetup",
    timeAgo: "2 days ago",
  },
];

const achievements = [
  {
    icon: Users,
    title: "Connector",
    description: "Connected with 50+ people",
    progress: 85,
  },
  {
    icon: Heart,
    title: "Influencer",
    description: "Received 100+ likes",
    progress: 60,
  },
  {
    icon: MessageCircle,
    title: "Conversationalist",
    description: "Made 50+ comments",
    progress: 40,
  },
  {
    icon: Zap,
    title: "Active Member",
    description: "Posted 25+ times",
    progress: 75,
  },
];

const networkStats = [
  { label: "Total Connections", value: "127", icon: Users, change: "+12" },
  { label: "This Week's Taps", value: "23", icon: TrendingUp, change: "+8" },
  { label: "Profile Views", value: "456", icon: Eye, change: "+34" },
  { label: "Post Engagement", value: "89%", icon: Heart, change: "+5%" },
];

export default function SidebarContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div
                    className={`p-2 rounded-full ${action.color} text-white`}
                  >
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Network Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Network Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {networkStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  {stat.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Connections */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Recent Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentConnections.map((connection, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={connection.avatar} />
                  <AvatarFallback>
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">{connection.name}</div>
                  <div className="text-xs text-gray-500">
                    {connection.position} at {connection.company}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {connection.tapLocation} • {connection.timeAgo}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-3">
              View All Connections
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <achievement.icon className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">
                      {achievement.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {achievement.progress}%
                  </span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
                <p className="text-xs text-gray-500">
                  {achievement.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips & Guidance */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Gift className="h-5 w-5 mr-2 text-blue-500" />
              Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Share your card at networking events to automatically connect with
              people you meet!
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Network Goal */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-500" />
              Monthly Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">47/50</div>
              <div className="text-sm text-gray-500">New Connections</div>
            </div>
            <Progress value={94} className="h-3" />
            <p className="text-xs text-center text-gray-500">
              You&#39;re so close! Just 3 more connections to reach your goal 🎯
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
