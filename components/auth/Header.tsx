import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";

const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col text-[77px]">
      <p className={cn(fonts.className)}>{label}</p>
    </div>
  );
};
