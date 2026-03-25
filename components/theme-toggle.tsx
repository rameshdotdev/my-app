"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { setMode } from "@/store/features/themeSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { cn, SOUND_FILES } from "@/lib/utils";
import { useSoundFile } from "@/hooks/use-sound-file";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const { play } = useSoundFile({
    volume: 1,
    enabled: true,
    sounds: SOUND_FILES,
  });
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
    play("whoosh");
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
      className={cn("rounded-full", className)}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      data-ignore-button="true"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
