"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      aria-label="Toggle theme"
      variant="ghost"
      size="icon"
      onClick={handleToggle}
    >
      {isDark ? (
        <IconSun className="size-5" />
      ) : (
        <IconMoon className="size-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
