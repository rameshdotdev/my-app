"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppDispatch } from "@/hooks/hooks";
import { setMode } from "@/store/features/themeSlice";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  /* Prevent hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Sync theme with Redux */
  useEffect(() => {
    if (resolvedTheme) {
      dispatch(setMode(resolvedTheme as "light" | "dark"));
    }
  }, [resolvedTheme, dispatch]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-live="polite"
      className="rounded-full"
    >
      {resolvedTheme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
