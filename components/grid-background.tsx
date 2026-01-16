import React from "react";
import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  gridSize?: number; // optional control
};

export function GridBackground({
  children,
  className,
  gridSize = 40,
}: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full bg-background", className)}>
      {/* Grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "bg-fixed bg-center bg-repeat",
          `bg-size-[${gridSize}px_${gridSize}px]`,
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative  z-10">{children}</div>
    </div>
  );
}
