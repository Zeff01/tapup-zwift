import * as React from "react";
import Link from "next/link";

import { ExtendedUserInterface } from "@/types/types"; // Assuming this type exists and is correct
import { cn } from "@/lib/utils"; // Assuming cn utility exists

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: ExtendedUserInterface;
}

export function UserCard({ user, className, ...props }: UserCardProps) {
  const fallbackInitials = `${user.firstName?.charAt(0) ?? ""}${
    user.lastName?.charAt(0) ?? ""
  }`.toUpperCase();
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <Card className={cn("w-full max-w-full", className)} {...props}>
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Avatar>
          <AvatarImage src={user.profilePictureUrl} alt={fullName} />
          <AvatarFallback>{fallbackInitials || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">
            {fullName || "Unnamed User"}
          </CardTitle>
          <CardDescription>{user.email || "No Email Provided"}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">
            Role:
          </span>
          <Badge variant="outline">{user.role || "N/A"}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-2">User Cards</h2>
        <p className="text-muted-foreground mb-4">
          This is a list of all cards assigned to this user.
        </p>
      </CardFooter>
    </Card>
  );
}
