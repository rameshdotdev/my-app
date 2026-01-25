"use client";

import React, { useMemo, useState } from "react";
import Tooltip from "./toolpit";
import Legend from "./legend";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionCalendarProps {
  weeks: ContributionWeek[];
}

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  weeks,
}) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const monthLabels = useMemo(() => {
    const labels: { name: string; weekIndex: number }[] = [];
    weeks.forEach((week, index) => {
      const firstDay = new Date(week.days[0].date);
      if (firstDay.getDate() <= 7) {
        const monthName = MONTH_NAMES[firstDay.getMonth()];
        if (
          labels.length === 0 ||
          labels[labels.length - 1].name !== monthName
        ) {
          labels.push({ name: monthName, weekIndex: index });
        }
      }
    });
    return labels;
  }, [weeks]);

  const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
    setHoveredDay(day);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setTooltipPos(null);
  };

  /**
   * shadcn-token based heatmap colors
   * NOTE: We use CSS vars so it auto adapts to theme.
   */
  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-muted";
      case 1:
        return "bg-primary/15";
      case 2:
        return "bg-primary/30";
      case 3:
        return "bg-primary/50";
      case 4:
        return "bg-primary/75";
      default:
        return "bg-muted";
    }
  };

  return (
    <div
      className="w-fit overflow-x-auto rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6 scrollbar-hide"
      style={{
        ["--sq-size" as any]: "10px",
        ["--sq-gap" as any]: "2px",
      }}
    >
      <div className="select-none min-w-max md:[--sq-size:14px] md:[--sq-gap:2px]">
        {/* Month Labels Row */}
        <div className="relative mb-2 h-5 text-[10px] text-muted-foreground md:text-xs">
          {monthLabels.map((label, i) => (
            <span
              key={`${label.name}-${i}`}
              className="absolute whitespace-nowrap transition-all duration-300"
              style={{
                left: `calc(${label.weekIndex} * (var(--sq-size) + var(--sq-gap)))`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Heatmap Grid */}
          <div className="flex" style={{ gap: "var(--sq-gap)" }}>
            {weeks.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex flex-col"
                style={{ gap: "var(--sq-gap)" }}
              >
                {week.days.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      width: "var(--sq-size)",
                      height: "var(--sq-size)",
                    }}
                    className={[
                      "relative z-0 cursor-pointer rounded-[2px] transition-all duration-150 hover:z-10",
                      "hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background",
                      getLevelClass(day.level),
                    ].join(" ")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center md:text-xs">
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent pb-0.5 transition-colors hover:border-primary hover:text-primary"
          >
            Learn how we count contributions
          </a>
          <Legend />
        </div>
      </div>

      <Tooltip day={hoveredDay} position={tooltipPos} />
    </div>
  );
};

export default ContributionCalendar;
