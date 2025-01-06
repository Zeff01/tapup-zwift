import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  className?: string;
};

const Check = ({ className }: Props) => (
  <svg
    width="56"
    height="42"
    viewBox="0 0 56 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("aspect-[98/27]", className)}
  >
    <path
      d="M7.86508 13.2361L21.2859 26.497L48.1053 0L56 7.79977L21.3851 42L0 20.872L7.86508 13.2361Z"
      fill="#B6E0BE"
    />
  </svg>
);

export default Check;
