"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowRight, CalendarDays, Flame, RefreshCcw } from "lucide-react";

import { api } from "@/lib/axios";
import { WakaTimeSectionCards } from "./wakatome-section-cards";

import ContributionCalendar, {
  type ContributionWeek,
  type ContributionDay,
} from "@/components/github/contributions-calendar";

type EditorName = "VS Code" | "Cursor";

type WakaTimeDailyDoc = {
  _id: string;
  date: string; // YYYY-MM-DD
  combined: { total_seconds: number };
  editors: Array<{ name: EditorName; total_seconds: number }>;
  createdAt: string;
  updatedAt: string;
};

type RangeApiResponse = {
  ok: boolean;
  count: number;
  range: { from: string; to: string };
  data: WakaTimeDailyDoc[];
};

type FilterMode = "weekly" | "monthly" | "yearly" | "custom";

type FilledDay = {
  date: string;
  total_seconds: number;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toYMD(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function ymdToDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function getRange(mode: Exclude<FilterMode, "custom">) {
  const now = new Date();

  if (mode === "weekly") {
    const to = new Date(now);
    const from = new Date(now);
    from.setDate(now.getDate() - 6);
    return { from: toYMD(from), to: toYMD(to) };
  }

  if (mode === "monthly") {
    const to = new Date(now);
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: toYMD(from), to: toYMD(to) };
  }

  const to = new Date(now);
  const from = new Date(now.getFullYear(), 0, 1);
  return { from: toYMD(from), to: toYMD(to) };
}

function daysBetweenInclusive(fromYMD: string, toYMDStr: string) {
  const from = ymdToDate(fromYMD);
  const to = ymdToDate(toYMDStr);
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

function fillMissingDays(
  fromYMD: string,
  toYMDStr: string,
  docs: WakaTimeDailyDoc[],
) {
  const map = new Map(docs.map((d) => [d.date, d]));
  const start = ymdToDate(fromYMD);
  const totalDays = daysBetweenInclusive(fromYMD, toYMDStr);

  const filled: FilledDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    const key = toYMD(dt);

    const doc = map.get(key);
    const total = doc?.combined?.total_seconds ?? 0;

    filled.push({
      date: key,
      total_seconds: total,
    });
  }

  return filled;
}

function getPrevRange(from: string, to: string) {
  const fromDate = ymdToDate(from);
  const toDate = ymdToDate(to);

  const days =
    Math.floor(
      (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  const prevTo = new Date(fromDate);
  prevTo.setDate(fromDate.getDate() - 1);

  const prevFrom = new Date(prevTo);
  prevFrom.setDate(prevTo.getDate() - (days - 1));

  return { from: toYMD(prevFrom), to: toYMD(prevTo) };
}

function maxSecondsInFilled(filled: FilledDay[]) {
  let max = 0;
  for (const d of filled) max = Math.max(max, d.total_seconds ?? 0);
  return max;
}

function getLevelFromHours(hours: number, maxHours: number): 0 | 1 | 2 | 3 | 4 {
  if (hours <= 0) return 0;

  const ratio = hours / Math.max(1, maxHours);

  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function buildWeeksFromFilledDays(
  filledDays: FilledDay[],
  maxHours: number,
): ContributionWeek[] {
  const map = new Map(
    filledDays.map((d) => [d.date, Math.floor((d.total_seconds ?? 0) / 3600)]),
  );

  if (!filledDays.length) return [];

  const start = ymdToDate(filledDays[0].date);
  const end = ymdToDate(filledDays[filledDays.length - 1].date);

  // align start to Sunday
  const startAligned = new Date(start);
  startAligned.setDate(startAligned.getDate() - startAligned.getDay());

  const weeks: ContributionWeek[] = [];
  let cursor = new Date(startAligned);

  while (cursor <= end) {
    const days: ContributionDay[] = [];

    for (let i = 0; i < 7; i++) {
      const key = toYMD(cursor);
      const hours = map.get(key) ?? 0;

      days.push({
        date: key,
        count: hours,
        level: getLevelFromHours(hours, maxHours),
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push({ days });
  }

  return weeks;
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getLast12MonthsRange(lastYMD: string) {
  const lastDate = ymdToDate(lastYMD);

  const from = startOfMonth(addMonths(lastDate, -11));
  const to = endOfDay(lastDate);

  return { from: toYMD(from), to: toYMD(to) };
}

function DashboardError({ error }: { error: string }) {
  return (
    <div className="rounded-2xl border bg-muted/40 p-4">
      <p className="text-sm font-medium">Couldn’t load dashboard</p>
      <p className="text-xs text-muted-foreground">{error}</p>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-28 w-full animate-pulse rounded-2xl bg-muted" />
      <div className="h-64 w-full animate-pulse rounded-2xl bg-muted" />
      <div className="h-64 w-full animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}

export default function WakaTimeDashboard() {
  const [mode, setMode] = React.useState<FilterMode>("weekly");

  const [customFrom, setCustomFrom] = React.useState<Date | undefined>();
  const [customTo, setCustomTo] = React.useState<Date | undefined>();

  const [range, setRange] = React.useState(() => getRange("weekly"));

  const [docs, setDocs] = React.useState<WakaTimeDailyDoc[]>([]);
  const [prevDocs, setPrevDocs] = React.useState<WakaTimeDailyDoc[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [prevLoading, setPrevLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const activeLabel =
    mode === "weekly"
      ? "Weekly"
      : mode === "monthly"
        ? "Monthly"
        : mode === "yearly"
          ? "Yearly"
          : "Custom";

  const fetchRange = React.useCallback(async (from: string, to: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<RangeApiResponse>(
        `/wakatime/daily/range?from=${from}&to=${to}`,
      );

      setDocs(res.data?.data ?? []);
    } catch (e: any) {
      setError(
        e?.response?.data?.error ?? e?.message ?? "Something went wrong",
      );
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPrevRange = React.useCallback(async (from: string, to: string) => {
    setPrevLoading(true);

    try {
      const res = await api.get<RangeApiResponse>(
        `/wakatime/daily/range?from=${from}&to=${to}`,
      );

      setPrevDocs(res.data?.data ?? []);
    } catch {
      setPrevDocs([]);
    } finally {
      setPrevLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (mode === "custom") return;
    const r = getRange(mode);
    setRange(r);
    fetchRange(r.from, r.to);
  }, [mode, fetchRange]);

  const prevRange = React.useMemo(
    () => getPrevRange(range.from, range.to),
    [range],
  );

  React.useEffect(() => {
    fetchPrevRange(prevRange.from, prevRange.to);
  }, [prevRange.from, prevRange.to, fetchPrevRange]);

  const filled = React.useMemo(() => {
    return fillMissingDays(range.from, range.to, docs);
  }, [docs, range.from, range.to]);

  const prevFilled = React.useMemo(() => {
    return fillMissingDays(prevRange.from, prevRange.to, prevDocs);
  }, [prevDocs, prevRange.from, prevRange.to]);

  // ===========================
  // ✅ ContributionCalendar (always last 12 months)
  // ===========================
  const calendarFilled = React.useMemo(() => {
    if (!docs.length) return [];

    const lastDoc = [...docs]
      .sort((a, b) => a.date.localeCompare(b.date))
      .at(-1);

    if (!lastDoc?.date) return [];

    const calRange = getLast12MonthsRange(lastDoc.date);
    return fillMissingDays(calRange.from, calRange.to, docs);
  }, [docs]);

  const calendarMaxSeconds = React.useMemo(() => {
    return maxSecondsInFilled(calendarFilled);
  }, [calendarFilled]);

  const calendarMaxHours = Math.max(1, Math.floor(calendarMaxSeconds / 3600));

  const weeks = React.useMemo(() => {
    return buildWeeksFromFilledDays(calendarFilled, calendarMaxHours);
  }, [calendarFilled, calendarMaxHours]);

  const canApplyCustom = Boolean(customFrom && customTo);

  const applyCustom = async () => {
    if (!customFrom || !customTo) return;

    const from = customFrom <= customTo ? toYMD(customFrom) : toYMD(customTo);
    const to = customFrom <= customTo ? toYMD(customTo) : toYMD(customFrom);

    setMode("custom");
    setRange({ from, to });

    await fetchRange(from, to);

    const pr = getPrevRange(from, to);
    await fetchPrevRange(pr.from, pr.to);
  };

  const refresh = async () => {
    await fetchRange(range.from, range.to);
    await fetchPrevRange(prevRange.from, prevRange.to);
  };

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg">
              WakaTime Dashboard
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              {activeLabel} view • {range.from} → {range.to}
              {prevLoading ? (
                <span className="ml-2 text-muted-foreground">
                  (comparing...)
                </span>
              ) : null}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={mode}
              onValueChange={(v) => setMode(v as FilterMode)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {mode === "custom" && (
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {customFrom ? toYMD(customFrom) : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="end">
                    <Calendar
                      mode="single"
                      selected={customFrom}
                      onSelect={setCustomFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {customTo ? toYMD(customTo) : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="end">
                    <Calendar
                      mode="single"
                      selected={customTo}
                      onSelect={setCustomTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={applyCustom}
                  disabled={!canApplyCustom || loading}
                >
                  Apply
                </Button>
              </div>
            )}

            <Button
              size="icon"
              variant="outline"
              onClick={refresh}
              disabled={loading}
              aria-label="Refresh dashboard"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />
      </div>

      {/* Body */}
      {loading ? (
        <DashboardLoading />
      ) : error ? (
        <DashboardError error={error} />
      ) : (
        <div className="space-y-6">
          <WakaTimeSectionCards
            filledDays={filled.map((d) => ({
              date: d.date,
              total_seconds: d.total_seconds,
            }))}
            prevFilledDays={prevFilled.map((d) => ({
              date: d.date,
              total_seconds: d.total_seconds,
            }))}
            label={activeLabel.toLowerCase()}
          />

          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Heatmap</p>
                <p className="text-xs text-muted-foreground">
                  Auto preview last 12 months
                </p>
              </div>

              <Badge variant="outline" className="gap-1">
                <Flame className="h-3.5 w-3.5 text-primary" />
                Max day: {calendarMaxHours}h
              </Badge>
            </div>

            <div className="mt-4">
              <ContributionCalendar weeks={weeks} />
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Tip: each block represents a day, intensity is based on hours
              coded.
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Keep it going 🔥</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Consistency beats intensity. Even a small session daily compounds
              into massive progress.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
