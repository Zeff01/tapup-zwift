"use client";

import Image from "next/image";
import React from "react";

import Link from "next/link";

import profilePic from "@/public/assets/template4samplepic.png";
import { BiLogOut } from "react-icons/bi";
import { adminMenuItems } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ThemeToggle } from "../Theme";
import NotificationsSidebar from "./notifications";
import { useUserContext } from "@/providers/user-provider";

const AdminNavigation = () => {
  const pathname = usePathname();
  const { user, notifications: notif, logOutUser: signOut } = useUserContext();

  const notifications = notif ?? [];

  return (
    <nav className="w-[25rem] px-8 flex flex-col border-r fixed z-50 ease-in-out h-screen transition-transform -translate-x-[25rem] lg:translate-x-0">
      <div className="py-8 flex justify-between items-center px-4">
        <TapupLogo />
      </div>
      <div className="relative border p-1 rounded-full outline-white outline-2 flex items-center gap-2">
        <Image
          unoptimized={true}
          src={user?.profilePictureUrl || profilePic}
          alt="user image"
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-sm">
            {user?.firstName
              ? `${user?.firstName} ${user?.lastName}`
              : "Anonymous"}
          </h3>
          <input
            readOnly
            value={user?.email || "anonymous@mail.com"}
            className="text-xs text-foreground/30 border-0 truncate w-32 bg-transparent outline-none"
          />
        </div>
        <span className="ml-auto flex mr-2">
          <ThemeToggle variant="boarded" />
          <NotificationsSidebar user={user} notifications={notifications} />
        </span>
      </div>
      <div className="flex-1 pb-12 flex flex-col mt-12 gap-2">
        {adminMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center transition-colors duration-200 pl-4 bg-secondary/20 border p-3 rounded-sm",
                item.href === pathname
                  ? "bg-green-500 text-background font-black"
                  : "hover:bg-accent"
              )}
            >
              <Icon className="size-6 mr-4" />
              {item.title}
            </Link>
          );
        })}
        <Button
          className="mt-auto flex justify-start gap-0 py-6 bg-secondary/20 border text-foreground text-base"
          variant="destructive"
          onClick={signOut}
        >
          <BiLogOut className="size-8 mr-4" />
          Sign out
        </Button>
      </div>
    </nav>
  );
};

export default AdminNavigation;
