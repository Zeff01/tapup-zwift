"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share,
  Send,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Image as ImageIcon,
  MoreHorizontal,
} from "lucide-react";

// Dummy data for posts
const dummyPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "sarahc_design",
      avatar: "/api/placeholder/40/40",
      position: "UX Designer",
      company: "TechFlow Inc",
      cardColor: "bg-purple-500",
    },
    content: "Just launched our new design system! Excited to share this with the community. The components are now more accessible and user-friendly. 🎨✨",
    image: "/api/placeholder/500/300",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    tapConnection: "Met at Design Conference 2024",
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: "Marcus Rodriguez",
      username: "marcus_dev",
      avatar: "/api/placeholder/40/40",
      position: "Full Stack Developer",
      company: "StartupHub",
      cardColor: "bg-blue-500",
    },
    content: "Coffee break thoughts: The best code is the code you don't have to write. Sometimes the simplest solution is the most elegant one. What's your favorite programming principle?",
    timestamp: "4 hours ago",
    likes: 18,
    comments: 12,
    shares: 2,
    tapConnection: "Met at Tech Meetup Downtown",
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: "Emma Thompson",
      username: "emma_marketing",
      avatar: "/api/placeholder/40/40",
      position: "Marketing Director",
      company: "BrandWorks",
      cardColor: "bg-green-500",
    },
    content: "Our latest campaign exceeded expectations by 300%! Here's what we learned about authentic storytelling in the digital age...",
    image: "/api/placeholder/500/200",
    timestamp: "6 hours ago",
    likes: 45,
    comments: 15,
    shares: 8,
    tapConnection: "Met at Marketing Summit",
    isLiked: false,
  },
];

export default function FeedSection() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: posts.length + 1,
        user: {
          name: "You",
          username: "your_username",
          avatar: "/api/placeholder/40/40",
          position: "Your Position",
          company: "Your Company",
          cardColor: "bg-emerald-500",
        },
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        tapConnection: "Your Post",
        isLiked: false,
      };
      setPosts([newPostData, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar>
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share something with your TapConnect network..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="border-0 resize-none focus:ring-0 min-h-[80px]"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </Button>
                  </div>
                  <Button onClick={handlePost} disabled={!newPost.trim()} size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 2) }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback className={post.user.cardColor}>
                          {post.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {post.user.name}
                        </h3>
                        <span className="text-gray-500 text-sm">@{post.user.username}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Briefcase className="h-3 w-3" />
                        <span>{post.user.position} at {post.user.company}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {post.tapConnection}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-sm">{post.timestamp}</span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-900 dark:text-white mb-3 leading-relaxed">
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="mb-4">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      {post.shares}
                    </Button>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="mt-3 pt-3 border-t">
                  <div className="flex space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>YU</AvatarFallback>
                    </Avatar>
                    <Input 
                      placeholder="Write a comment..." 
                      className="flex-1"
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}