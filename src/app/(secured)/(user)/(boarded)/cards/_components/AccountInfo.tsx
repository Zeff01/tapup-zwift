"use client";

import { UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface AccountInfoProps {
  isLoading: boolean;
  name: string;
  email: string;
  avatar: string;
}

export default function AccountInfo({
  isLoading,
  name,
  email,
  avatar,
}: AccountInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span className="font-medium">
              {isLoading ? <Skeleton className="h-4 w-44" /> : name}
            </span>
            <span className="text-sm text-gray-600">
              {isLoading ? <Skeleton className="h-4 w-36 mt-2" /> : email}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}