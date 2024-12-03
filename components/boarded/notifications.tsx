"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Plus } from "lucide-react";

import React from "react";
import { Button } from "../ui/button";
import { Notifications, UserState } from "@/types/types";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { createNotification } from "@/lib/firebase/actions/notification.action";
import { NavigationItems } from "../NotificationItem";

type Props = {
  user: UserState;
  notifications: Notifications;
};

const NotificationsSidebar = ({ user, notifications }: Props) => {
  const unReadNotif = notifications.some((item) => !item.data.read);

  const { mutate: createNotificationMutation } = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleCreateNotification = () => {
    // This will create a notification and send to a specific user

    createNotificationMutation({
      userId: "xEfwE1dUY2bQcVspHnFYa5b715K2", // current User
      data: {
        title: "test",
        message: "test",
        read: false,
        type: "info",
        broadcast: false,
        userId: "ANvgs5O0MUXohWuzvh4viHArAQ82", // specify user
      },
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-full relative"
          variant="ghost"
          size="icon-sm"
        >
          {unReadNotif && (
            <>
              <span className="size-2 bg-destructive absolute rounded-full top-2 right-2 animate-ping" />
              <span className="size-2 bg-destructive absolute rounded-full top-2 right-2" />
            </>
          )}

          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">Notifications</SheetTitle>
          <SheetDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {notifications.length === 0 && (
                <p className="text-muted-foreground text-center">
                  You have no notifications
                </p>
              )}
              {notifications.map((notif) => (
                <NavigationItems
                  user={user}
                  key={notif.id}
                  className="flex"
                  variant={notif.data.type}
                  notif={notif}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <Button onClick={handleCreateNotification}>
          <Plus size={6} />
        </Button>

        <SheetFooter className="mx-auto text-xs">
          Stay up-to-date with the latest notifications and alerts
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsSidebar;
