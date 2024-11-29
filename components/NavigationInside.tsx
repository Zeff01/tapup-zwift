"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import profilePic from "@/public/assets/template4samplepic.png";
import { BiLogOut } from "react-icons/bi";
import { menuItems } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import TapupLogo from "./svgs/TapupLogo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { ThemeToggle } from "./Theme";

const OverlayMenu = () => {
  const { user, logOutUser: signOut } = useUserContext();
  const media = useMediaQuery("(max-width: 1024px)");
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname().split("/")[1];

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
        <div className="absolute top-2 left-6 ">
          <ThemeToggle />
        </div>
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <div className="py-8 pt-20">
          {/* <ThemeToggle /> */}
          <TapupLogo />
        </div>
        <div className="relative bg-accent py-4 px-6 rounded-full outline-white outline-2 flex items-center gap-4">
          <Image
            src={user?.profilePictureUrl || profilePic}
            alt="user image"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="font-bold">
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : "Anonymous"}
            </h3>
            <p
              title={user?.email}
              className="text-xs truncate hover:overflow-visible w-44"
            >
              {user?.email || "anonymous@mail.com"}
            </p>
          </div>
        </div>
        <div className="flex-1 pb-12 flex flex-col mt-12 gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const href = {
              // "/dashboard": "/dashboard",
              "/user": `/user/update/${user?.uid}`,
              // "/cards": `/cards/${user?.uid}`,
            };
            return (
              <Link
                key={index}
                href={href[item.href as keyof typeof href] || item.href}
                className={cn(
                  "flex items-center transition-colors duration-200 pl-4 bg-secondary/20 border p-3 rounded-sm",
                  item.href.includes(pathname)
                    ? "bg-green-500 text-background font-black"
                    : "hover:bg-accent"
                )}
                onClick={handleOpenMenu}
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
      </SheetContent>
    </Sheet>
  );
};

export default OverlayMenu;
