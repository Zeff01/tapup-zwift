import React from "react";
import { cn } from "@/lib/utils";

interface TemplateFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const TemplateFooter: React.FC<TemplateFooterProps> = ({
  children,
  className = "",
}) => {
  return <div className={cn("mt-auto", className)}>{children}</div>;
};
