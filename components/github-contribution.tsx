"use client";
import { Gitmap, ContributionDay } from "./ui/gitmap";
import { addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function GithubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loaded, setLoaded] = useState(false);
  const API_BASE = "https://github-contributions-api.jogruber.de/v4";
  const colors = {
    empty: "var(--gitmap-ocean-empty)",
    level1: "var(--gitmap-ocean-level-1)",
    level2: "var(--gitmap-ocean-level-2)",
    level3: "var(--gitmap-ocean-level-3)",
    level4: "var(--gitmap-ocean-level-4)",
  };
  useEffect(() => {
    if (loaded) return;
    const fetchContributions = async () => {
      const res = await fetch(`${API_BASE}/rameshdotdev`, {
        next: { revalidate: 3600 },
      });
      const data = await res.json();
      setContributions(data.contributions);
      setLoaded(true);
    };

    fetchContributions();
  }, [loaded]);

  if (!contributions.length) {
    return <GitmapSkeleton />;
  }

  const today = new Date();

  return (
    <>
      <div
        data-gitmap-theme="ocean"
        className="overflow-x-auto sm:overflow-x-clip overflow-y-hidden"
      >
        <Gitmap
          contributions={contributions}
          from={addDays(today, -365)}
          to={today}
          colors={colors}
          showCounts={true}
          cellGap={3}
          // showDays={false}
          showFooter={true}
        />
      </div>

      <footer className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-sm whitespace-nowrap">
        <div>
          {contributions.reduce((sum, d) => sum + d.count, 0)} contributions in
          the last year
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <span className="mr-1 text-muted-foreground">Less</span>

          {Object.values(colors).map((color, i) => (
            <svg key={i} width="12" height="12">
              <rect
                width="12"
                height="12"
                rx="2"
                ry="2"
                fill={color}
                className="stroke-white/5"
              />
            </svg>
          ))}

          <span className="ml-1 text-muted-foreground">More</span>
        </div>
      </footer>
    </>
  );
}

export function GitmapSkeleton({ className }: { className?: string }) {
  const weeks = 53;
  const cellSize = 12;
  const cellGap = 3;

  return (
    <div
      className={cn("relative", className)}
      style={{ paddingLeft: 28, paddingTop: 15 }}
    >
      <div className="absolute -top-1 left-[28px] flex gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-3 w-5 rounded bg-muted/50 animate-pulse" />
        ))}
      </div>

      <div className="absolute left-0 top-[15px] space-y-[19px] pt-[7px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2.5 w-4 rounded bg-muted/50 animate-pulse"
          />
        ))}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(7, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
          gap: cellGap,
        }}
      >
        {Array.from({ length: weeks * 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[2px] bg-muted animate-pulse"
            style={{
              width: cellSize,
              height: cellSize,
              opacity: 0.2 + (((i * 7 + 13) % 17) / 17) * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
