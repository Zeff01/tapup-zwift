"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  variant = "default",
  showLabel = false,
}: {
  variant?: "default" | "boarded";
  showLabel?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const containerClasses = {
    default: "flex items-center gap-2",
    boarded: "flex items-center gap-2",
  };

  return (
    <div className={cn(containerClasses[variant])}>
      {showLabel && (
        <Sun className="h-4 w-4 text-muted-foreground" />
      )}
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
      </Switch>
      {showLabel && (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}
