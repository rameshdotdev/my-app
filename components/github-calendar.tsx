"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

export function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fixed container height to prevent layout shift
  const containerHeight = "min-h-[200px]";

  return (
    <div className={`relative overflow-hidden rounded-xl ${containerHeight}`}>
      {!mounted ? (
        <div className="w-full h-40 rounded-lg bg-muted/50 animate-pulse" />
      ) : (
        <div>
          <GitHubCalendar
            username="rameshdotdev"
            colorScheme={resolvedTheme as "light" | "dark"}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
          />
        </div>
      )}
    </div>
  );
}
