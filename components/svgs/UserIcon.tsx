import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  className?: string;
};

const UserIcon = ({ className }: Props) => (
  <span className={cn(className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  </span>
);

export default UserIcon;
