"use client";

import Image from "next/image";
import React from "react";

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
import { Edit, Edit2, ShoppingCart } from "lucide-react";
import EditAccountModal from "./EditAccountModal";

const NavigationBoarded = () => {
  const pathname = usePathname();
  const {
    user,
    logOutUser: signOut,
    isLoading: isLoadingUserContext,
  } = useUserContext();

  const isAdmin = user?.role === "admin";

  const navItems = [...menuItems, ...(isAdmin ? adminMenuItems : [])];

  return (
    <nav className="w-[22rem] px-6 flex flex-col border-r fixed z-50 ease-in-out h-screen transition-transform -translate-x-[25rem] lg:translate-x-0">
      <div className="flex justify-between items-center self-start w-full h-12 my-6 ">
        <Link href={"/dashboard"}>
          <TapupLogo className="w-20 lg:w-28" />
        </Link>
        <div className="pr-2">
          {isLoadingUserContext ? (
            <ShoppingCart className="!size-6 shrink-0" />
          ) : (
            <Cart />
          )}
        </div>
      </div>
      {isLoadingUserContext ? (
        <NavigationSkeleton />
      ) : (
        <React.Fragment>
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
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={
                    user?.firstName
                      ? `${user?.firstName} ${user?.lastName}`
                      : "Anonymous"
                  }
                  className="text-sm font-bold border-0 truncate w-full bg-transparent outline-none"
                />
                <p
                  className={cn(
                    "text-xs rounded-full px-1 text-center capitalize flex-1 text-white bg-greenColor",
                    {
                      "bg-red-700": isAdmin,
                    }
                  )}
                >
                  {user?.role}
                </p>
              </div>

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
          <div className="flex-1 pb-12 flex flex-col mt-12 gap-2">
            {navItems.map((item, index) => {
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
        </React.Fragment>
      )}
    </nav>
  );
};

export default NavigationBoarded;
