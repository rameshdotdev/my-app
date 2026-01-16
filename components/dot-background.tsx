import React from "react";
import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number; // optional control
  isOverlay?: boolean; // optional control
};

export function DotBackground({
  children,
  className,
  gridSize = 20,
  isOverlay = false,
}: GridBackgroundProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      {/* Grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "bg-fixed bg-center bg-repeat",
          `bg-size-[${gridSize}px_${gridSize}px]`,
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]"
        )}
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Radial gradient for the container to give a faded look */}
      {isOverlay && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      )}

      {/* Content */}
      <div className="relative  z-10">{children}</div>
    </div>
  );
}
