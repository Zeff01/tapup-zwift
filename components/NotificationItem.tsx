"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn, timeAgo } from "@/lib/utils";
import React from "react";
import { Notification, UserState } from "@/types/types";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  MessageSquareWarningIcon,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useUserContext } from "@/providers/user-provider";
import { useMutation } from "@tanstack/react-query";
import { deleteOrExcemptNotification } from "@/lib/firebase/actions/notification.action";
import { toast } from "react-toastify";

const navigationVariants = cva("w-2 rounded-l-md", {
  variants: {
    variant: {
      info: "bg-accent",
      success: "bg-green-500",
      error: "bg-red-600",
      warning: "bg-orange-500",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export interface NavigationItemsProps
  extends VariantProps<typeof navigationVariants> {
  className?: string;
  user: UserState;
  notif: {
    id: string;
    data: Notification;
  };
}

const NavigationItems = ({
  user,
  className,
  variant,
  notif,
}: NavigationItemsProps) => {
  const iconTable = {
    info: Bell,
    success: CheckCircle,
    error: AlertTriangle,
    warning: MessageSquareWarningIcon,
  };

  const Icon = iconTable["info"];

  const { mutate: handleExceptDeleteNotifMutation, isPending: isLoading } =
    useMutation({
      mutationFn: deleteOrExcemptNotification,
      onSuccess: () => {
        toast.success("Notification deleted");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  const handleExceptDeleteNotif = (notifId: string) => {
    if (!user || !notifId) return;
    handleExceptDeleteNotifMutation({
      userId: user.uid!,
      notificationId: notifId,
    });
  };
  return (
    <div
      className={cn(
        "flex pointer-events-auto opacity-100",
        isLoading && "pointer-events-none opacity-50"
      )}
    >
      <div className={cn(navigationVariants({ variant, className }))} />
      <div className="flex flex-col w-full border bg-secondary rounded-r-md">
        <div className=" flex items-center px-2 py-2 justify-between">
          <span className="flex items-center gap-2">
            <Icon className="size-4" />
            <h1 className="font-semibold text-sm capitalize">
              {notif.data.type}
            </h1>
            <span className="text-muted-foreground text-xs ">
              {timeAgo(notif.data.timestamp.toDate())}
            </span>
          </span>
          <Button
            onClick={() => handleExceptDeleteNotif(notif.id)}
            variant={"ghost"}
            size={"icon-sm"}
          >
            <X />
          </Button>
        </div>
        <span className="px-4">
          <h1 className="capitalize font-semibold">{notif.data.title}</h1>
          <p className="text-muted-foreground text-sm">{notif.data.message}</p>
        </span>
        <div className="border-t gap-2 border-muted-foreground p-2 mt-2 flex justify-end">
          {!notif.data.read && (
            <Button className="px-2 py-1 h-auto" variant={"ghost"}>
              Mark as Read
            </Button>
          )}
          <Button className="px-2 py-1 h-auto">Take Action</Button>
        </div>
      </div>
    </div>
  );
};

export { NavigationItems, navigationVariants };
