"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/providers/user-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DASHBOARD_ROUTE } from "@/constants";

type Props = {
  img?: string;
  className?: string;
};

const AvatarIcon = ({ img, className }: Props) => {
  // const { logOutUser, isAuthenticated, user } = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={cn(className)}>
          {/* <AvatarImage src={isAuthenticated ? img : ""} /> */}
          <AvatarFallback className="bg-secondary">
            <UserIcon className="text-primary" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {/* {isAuthenticated ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={DASHBOARD_ROUTE}>
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href={`/site/${user?.uid}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={`/card/${user?.uid}`}>
            <DropdownMenuItem>Card</DropdownMenuItem>
          </Link>
          <Link href={`/user/update/${user?.uid}`}>
            <DropdownMenuItem>User Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logOutUser}
            className="bg-red-500 font-bold text-white cursor-pointer hover:!bg-red-400 hover:!text-white"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <Link href="/login">
            <DropdownMenuItem>Sign In</DropdownMenuItem>
          </Link>
          <Link href="/signup">
            <DropdownMenuItem>Sign Up</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      )} */}
    </DropdownMenu>
  );
};

export default AvatarIcon;
