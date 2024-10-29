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

type Props = {
  img?: string;
  className?: string;
};

const AvatarIcon = ({ img, className }: Props) => {
  const { logOutUser } = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={cn(className)}>
          <AvatarImage src={img || "https://github.com/shadcn.png"} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem
          onClick={logOutUser}
          className="bg-red-500 font-bold text-white cursor-pointer hover:!bg-red-400 hover:!text-white"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarIcon;
