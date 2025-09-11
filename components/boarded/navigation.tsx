"use client";

import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";

import profilePic from "@/public/assets/template4samplepic.png";
import { BiLogOut } from "react-icons/bi";
import { menuItems, adminMenuItems } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ThemeToggle } from "../Theme";
import { useUserContext } from "@/providers/user-provider";
import NavigationSkeleton from "./NavigationSkeleton";

import Cart from "../cart/Cart";
import {
  Edit,
  Edit2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import EditAccountModal from "./EditAccountModal";

const NavigationBoarded = () => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const {
    user,
    logOutUser: signOut,
    isLoading: isLoadingUserContext,
  } = useUserContext();

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "super_admin";

  // Don't combine the arrays - we'll render them separately to add a separator

  return (
    <nav
      className={`${isMinimized ? "w-16" : "w-[22rem]"} ${isMinimized ? "px-2" : "px-6"} flex flex-col border-r fixed z-50 ease-in-out h-screen transition-all duration-300 -translate-x-[25rem] lg:translate-x-0`}
    >
      <div className="flex justify-between items-center self-start w-full h-12 my-6">
        {!isMinimized ? (
          <>
            <Link href={"/home"}>
              <TapupLogo className="w-20 lg:w-28" />
            </Link>
            <div className="pr-2">
              {isLoadingUserContext ? (
                <ShoppingCart className="!size-6 shrink-0" />
              ) : (
                <Cart />
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            <Button
              onClick={() => setIsMinimized(false)}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Toggle Button for expanded state */}
      {!isMinimized && (
        <Button
          onClick={() => setIsMinimized(true)}
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-6 rounded-full h-6 w-6 p-0 bg-white dark:bg-gray-800 border shadow-md z-10"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      )}
      {isLoadingUserContext ? (
        <NavigationSkeleton />
      ) : (
        <React.Fragment>
          {!isMinimized ? (
            <div className="relative border p-1 rounded-full outline-white outline-2 flex items-center gap-2">
              <Image
                unoptimized={true}
                src={user?.profilePictureUrl || profilePic}
                alt="user image"
                width={50}
                height={50}
                className="object-cover rounded-full h-[50px] w-[50px]"
              />
              <div className="flex flex-col w-full overflow-hidden">
                <input
                  readOnly
                  value={
                    user?.firstName
                      ? `${user?.firstName} ${user?.lastName}`
                      : "Anonymous"
                  }
                  className="text-sm font-bold border-0 truncate w-full bg-transparent outline-none pr-2"
                />
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-foreground/60 truncate flex-1">
                    {user?.email || "anonymous@mail.com"}
                  </p>
                  <p
                    className={cn(
                      "text-xs rounded-full px-2 py-0.5 text-center capitalize text-white bg-greenColor whitespace-nowrap",
                      {
                        "bg-red-700": isAdmin,
                        "bg-gradient-to-r from-purple-600 to-pink-600": isSuperAdmin,
                      }
                    )}
                  >
                    {isSuperAdmin ? "super admin" : user?.role}
                  </p>
                </div>
              </div>
              <EditAccountModal />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Image
                unoptimized={true}
                src={user?.profilePictureUrl || profilePic}
                alt="user image"
                width={32}
                height={32}
                className="object-cover rounded-full h-[32px] w-[32px]"
              />
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle variant="boarded" />
                {isLoadingUserContext ? (
                  <ShoppingCart className="!size-5 shrink-0" />
                ) : (
                  <Cart />
                )}
              </div>
            </div>
          )}
          <div className="flex-1 pb-12 flex flex-col mt-12 gap-2">
            {/* Regular menu items */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center transition-colors duration-200 bg-secondary/20 border rounded-sm",
                    isMinimized ? "justify-center p-2" : "pl-4 p-3",
                    item.href === pathname
                      ? "bg-green-500 text-background font-black"
                      : "hover:bg-accent"
                  )}
                  title={isMinimized ? item.title : undefined}
                >
                  <Icon className={`size-6 ${isMinimized ? "" : "mr-4"}`} />
                  {!isMinimized && item.title}
                </Link>
              );
            })}

            {/* Admin separator and items */}
            {(isAdmin || isSuperAdmin) && (
              <>
                <div className={cn(
                  "my-4 border-t border-gray-300 dark:border-gray-600 relative",
                  isMinimized ? "mx-2" : "mx-4"
                )}>
                  {!isMinimized && (
                    <span className="absolute -top-2 left-2 bg-background px-2 text-xs text-muted-foreground font-semibold">
                      {isSuperAdmin ? "SUPER ADMIN" : "ADMIN"}
                    </span>
                  )}
                </div>
                {adminMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`admin-${index}`}
                        href={item.href}
                        className={cn(
                          "flex items-center transition-colors duration-200 bg-secondary/20 border rounded-sm",
                          isMinimized ? "justify-center p-2" : "pl-4 p-3",
                          item.href === pathname
                            ? "bg-green-500 text-background font-black"
                            : "hover:bg-accent"
                        )}
                        title={isMinimized ? item.title : undefined}
                    >
                      <Icon className={`size-6 ${isMinimized ? "" : "mr-4"}`} />
                      {!isMinimized && item.title}
                    </Link>
                  );
                })}
              </>
            )}
            {/* Theme Toggle */}
            <div className={cn(
              "mt-auto mb-2 flex items-center",
              isMinimized ? "justify-center px-2" : "px-4"
            )}>
              {isMinimized ? (
                <ThemeToggle variant="boarded" />
              ) : (
                <ThemeToggle variant="boarded" showLabel />
              )}
            </div>
            
            {/* Sign Out Button */}
            <Button
              className={cn(
                "flex gap-0 py-6 bg-secondary/20 border text-foreground text-base",
                isMinimized ? "justify-center px-2" : "justify-start"
              )}
              variant="destructive"
              onClick={signOut}
              title={isMinimized ? "Sign out" : undefined}
            >
              <BiLogOut className={`size-8 ${isMinimized ? "" : "mr-4"}`} />
              {!isMinimized && "Sign out"}
            </Button>
          </div>
        </React.Fragment>
      )}
    </nav>
  );
};

export default NavigationBoarded;
