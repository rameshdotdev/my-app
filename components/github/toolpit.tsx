"use client";

import React from "react";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface TooltipProps {
  day: ContributionDay | null;
  position: { x: number; y: number } | null;
}

const Tooltip: React.FC<TooltipProps> = ({ day, position }) => {
  if (!day || !position) return null;

  return (
    <div
      className="
        fixed z-50 pointer-events-none
        -translate-x-1/2 -translate-y-full
      "
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="
          relative rounded-md border bg-popover px-2 py-1
          text-xs font-medium text-popover-foreground
          shadow-md
        "
      >
        <div className="whitespace-nowrap">
          <span className="font-semibold">{day.count}</span>{" "}
          {day.count === 1 ? "hour" : "hours"} on{" "}
          <span className="text-muted-foreground">{day.date}</span>
        </div>

        {/* arrow */}
        <div
          className="
            absolute left-1/2 top-full
            h-2 w-2 -translate-x-1/2 -translate-y-1/2
            rotate-45
            border-b border-r
            bg-popover
          "
        />
      </div>
    </div>
  );
};

export default Tooltip;
