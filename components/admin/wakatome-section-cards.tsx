"use client";

import * as React from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FilledDay = {
  date: string;
  total_seconds: number;
};

function formatSecondsCompact(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  if (h <= 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function sumSeconds(days: FilledDay[]) {
  return days.reduce((acc, d) => acc + (d.total_seconds ?? 0), 0);
}

function calcStreak(days: FilledDay[]) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if ((days[i]?.total_seconds ?? 0) > 0) streak++;
    else break;
  }
  return streak;
}

function bestDay(days: FilledDay[]) {
  if (days.length === 0) return null;
  return days.reduce((best, d) =>
    d.total_seconds > best.total_seconds ? d : best,
  );
}

function pctChange(curr: number, prev: number) {
  if (prev <= 0 && curr <= 0) return 0;
  if (prev <= 0) return 100;
  return ((curr - prev) / prev) * 100;
}

function TrendBadge({ value }: { value: number }) {
  const up = value >= 0;
  const Icon = up ? IconTrendingUp : IconTrendingDown;

  return (
    <Badge variant="outline" className="gap-1 tabular-nums">
      <Icon className="size-4" />
      {up ? "+" : ""}
      {value.toFixed(1)}%
    </Badge>
  );
}

export function WakaTimeSectionCards({
  filledDays,
  prevFilledDays,
  label = "this period",
}: {
  filledDays: FilledDay[];
  prevFilledDays: FilledDay[];
  label?: string;
}) {
  const total = sumSeconds(filledDays);
  const prevTotal = sumSeconds(prevFilledDays);

  const avg = filledDays.length ? total / filledDays.length : 0;
  const prevAvg = prevFilledDays.length ? prevTotal / prevFilledDays.length : 0;

  const streak = calcStreak(filledDays);
  const prevStreak = calcStreak(prevFilledDays);

  const best = bestDay(filledDays);
  const prevBest = bestDay(prevFilledDays);

  const totalTrend = pctChange(total, prevTotal);
  const avgTrend = pctChange(avg, prevAvg);
  const streakTrend = pctChange(streak, prevStreak);
  const bestTrend = pctChange(
    best?.total_seconds ?? 0,
    prevBest?.total_seconds ?? 0,
  );

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 px-0!">
      {/* Total */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Coding Time</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatSecondsCompact(total)}
          </CardTitle>
          <CardAction>
            <TrendBadge value={totalTrend} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Compared to previous {label}
            {totalTrend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Total across {filledDays.length} days
          </div>
        </CardFooter>
      </Card>

      {/* Streak */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Streak</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {streak} days
          </CardTitle>
          <CardAction>
            <TrendBadge value={streakTrend} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Keep the chain alive
            {streakTrend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Based on last continuous active days
          </div>
        </CardFooter>
      </Card>

      {/* Avg */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average / Day</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatSecondsCompact(avg)}
          </CardTitle>
          <CardAction>
            <TrendBadge value={avgTrend} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Consistency over intensity
            {avgTrend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Strong average means strong habits
          </div>
        </CardFooter>
      </Card>

      {/* Best day */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Best Day</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {best ? formatSecondsCompact(best.total_seconds) : "—"}
          </CardTitle>
          <CardAction>
            <TrendBadge value={bestTrend} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Peak focus day
            {bestTrend >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {best ? `On ${best.date}` : "No active day found"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
