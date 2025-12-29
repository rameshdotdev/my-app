"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { setMode } from "@/store/features/themeSlice";
import { useAppDispatch } from "@/hooks/hooks";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
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
    return <Button variant="ghost" size="icon" disabled />;
  }

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Fallback for unsupported browsers
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
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
