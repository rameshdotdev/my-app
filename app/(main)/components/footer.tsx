"use client";
import type { FC } from "react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

export const Footer: FC = () => {
  const { isScrolled, scrollDirection } = useScrollDirection();
  return (
    <footer
      className={cn(
        "w-full border border-t-2",
        "transition-all duration-300",
        scrollDirection === "down" && isScrolled && "translate-y-full",
        isScrolled && "backdrop-blur-md bg-background/70 border-b border-border"
      )}
    >
      <div className="w-full flex h-14 items-center place-content-center text-sm text-muted-foreground text-center">
        <div>
          © {2025} – {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
};
