"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import profilePic from "@/public/assets/template4samplepic.png";
import { BiLogOut } from "react-icons/bi";
import { adminMenuItems, menuItems } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";
import { ThemeToggle } from "../Theme";
import { useUserContext } from "@/providers/user-provider";
import NavigationSkeleton from "./NavigationSkeleton";
import EditAccountModal from "./EditAccountModal";

const OverlayMenu = () => {
  const {
    user,
    logOutUser: signOut,
    isLoading: isLoadingUserContext,
  } = useUserContext();
  const media = useMediaQuery("(max-width: 1024px)");
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "super_admin";

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Sheet open={media && openMenu} onOpenChange={handleOpenMenu}>
      <SheetTrigger className="lg:hidden block">
        <HiMenuAlt3
          size={20}
          className="bg-accent rounded-sm p-1 w-8 h-8 md:w-10 md:h-10"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-background flex flex-col sm:w-[25rem] w-full"
      >
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <Link
          href={"/cards"}
          onClick={() => setOpenMenu(false)}
          className="inline-block self-start h-12 w-24"
        >
          <TapupLogo className="w-full h-full" />
        </Link>

        {isLoadingUserContext ? (
          <NavigationSkeleton />
        ) : (
          <React.Fragment>
            <div className="space-y-2">
              {/* Role badge outside the profile oblong */}
              {(isAdmin || isSuperAdmin) && (
                <div className="flex justify-center">
                  <p
                    className={cn(
                      "text-xs rounded-full px-3 py-1 text-center capitalize text-white",
                      {
                        "bg-red-700": isAdmin && !isSuperAdmin,
                        "bg-gradient-to-r from-purple-600 to-pink-600": isSuperAdmin,
                      }
                    )}
                  >
                    {isSuperAdmin ? "super admin" : "admin"}
                  </p>
                </div>
              )}
              
              {/* Profile oblong */}
              <div className="relative border p-1 rounded-full outline-white outline-2 flex items-center gap-2">
                <Image
                  unoptimized={true}
                  src={user?.profilePictureUrl || profilePic}
                  alt="user image"
                  width={50}
                  height={50}
                  className="object-cover rounded-full h-[50px] w-[50px]"
                />
                <div className="flex flex-col w-full">
                  <input
                    readOnly
                    value={
                      user?.firstName
                        ? `${user?.firstName} ${user?.lastName}`
                        : "Anonymous"
                    }
                    className="text-sm font-bold border-0 truncate w-full bg-transparent outline-none"
                  />
                  <input
                    readOnly
                    value={user?.email || "anonymous@mail.com"}
                    className="text-xs text-foreground/30 border-0 truncate w-full bg-transparent outline-none"
                  />
                </div>
                <EditAccountModal />
                <span className="ml-auto flex mr-2">
                  <ThemeToggle variant="boarded" showLabel />
                </span>
              </div>
            </div>

            <div className="flex-1 pb-12 flex flex-col mt-4 gap-2">
              {/* Regular menu items */}
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className={cn(
                      "flex items-center transition-colors text-sm duration-200 pl-4 bg-secondary/20 border p-2 rounded-sm",
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
              
              {/* Admin separator and items */}
              {(isAdmin || isSuperAdmin) && (
                <>
                  <div className="my-2 mx-4 border-t border-gray-300 dark:border-gray-600 relative">
                    <span className="absolute -top-2 left-2 bg-background px-2 text-xs text-muted-foreground font-semibold">
                      {isSuperAdmin ? "SUPER ADMIN" : "ADMIN"}
                    </span>
                  </div>
                  {adminMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`admin-${index}`}
                        href={item.href}
                        onClick={() => setOpenMenu(false)}
                        className={cn(
                          "flex items-center transition-colors text-sm duration-200 pl-4 bg-secondary/20 border p-2 rounded-sm",
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
                </>
              )}
              
              <Button
                className="mt-auto flex justify-start gap-0 p-2 text-sm bg-secondary/20 border text-foreground "
                variant="destructive"
                onClick={signOut}
              >
                <BiLogOut className="mr-4" />
                Sign out
              </Button>
            </div>
          </React.Fragment>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default OverlayMenu;
