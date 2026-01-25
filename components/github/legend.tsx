"use client";

import React from "react";

const Legend: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>Less</span>

      <div className="h-2.5 w-2.5 rounded-[1px] bg-muted" />
      <div className="h-2.5 w-2.5 rounded-[1px] bg-primary/15" />
      <div className="h-2.5 w-2.5 rounded-[1px] bg-primary/30" />
      <div className="h-2.5 w-2.5 rounded-[1px] bg-primary/50" />
      <div className="h-2.5 w-2.5 rounded-[1px] bg-primary/75" />

      <span>More</span>
    </div>
  );
};

export default Legend;
