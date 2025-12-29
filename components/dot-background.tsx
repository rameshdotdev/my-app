import React from "react";
import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  gridSize?: number; // optional control
};

export function DotBackground({
  children,
  className,
  gridSize = 20,
}: GridBackgroundProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0",
         "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative  z-10">{children}</div>
    </div>
  );
}
