"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api } from "@/lib/axios";

type AdminChartRow = {
  date: string;
  desktop: number;
  mobile: number;
};

type Totals = {
  visitors: number;
  pageviews: number;
};

type PublicSummary = Totals;

type AdminResponse = {
  totals: Totals;
  daily: AdminChartRow[];
};

type VisitorResponse = PublicSummary | AdminResponse;

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

function isAdminResponse(data: VisitorResponse): data is AdminResponse {
  return typeof data === "object" && data !== null && "daily" in data;
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [adminDaily, setAdminDaily] = React.useState<AdminChartRow[]>([]);
  const [adminTotals, setAdminTotals] = React.useState<Totals | null>(null);

  const [publicSummary, setPublicSummary] =
    React.useState<PublicSummary | null>(null);

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<VisitorResponse>(
          `/visitor?range=${timeRange}`,
        );

        if (cancelled) return;

        if (isAdminResponse(res.data)) {
          setAdminDaily(res.data.daily);
          setAdminTotals(res.data.totals);
          setPublicSummary(null);
        } else {
          setPublicSummary(res.data);
          setAdminDaily([]);
          setAdminTotals(null);
        }
      } catch {
        if (cancelled) return;
        setError("Failed to load visitor data");
        setAdminDaily([]);
        setAdminTotals(null);
        setPublicSummary(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
                ? "30 days"
                : "7 days"}
          </span>
          <span className="@[540px]/card:hidden">
            {timeRange === "90d"
              ? "Last 3 months"
              : timeRange === "30d"
                ? "Last 30 days"
                : "Last 7 days"}
          </span>
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-[8px]">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Loading */}
        {loading && (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Loading analytics...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex h-[250px] items-center justify-center text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Public Summary */}
        {!loading && !error && publicSummary && (
          <div className="flex h-[250px] flex-col items-center justify-center gap-2 text-center">
            <div className="text-sm text-muted-foreground">
              Public analytics (summary)
            </div>

            <div className="text-3xl font-semibold">
              {formatNumber(publicSummary.visitors)}
            </div>
            <div className="text-sm text-muted-foreground">Visitors</div>

            <div className="mt-3 text-lg font-medium">
              {formatNumber(publicSummary.pageviews)}
            </div>
            <div className="text-sm text-muted-foreground">Pageviews</div>
          </div>
        )}

        {/* Admin View */}
        {!loading && !error && !publicSummary && (
          <>
            {/* Admin KPIs */}
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border bg-card p-4">
                <div className="text-sm text-muted-foreground">Visitors</div>
                <div className="mt-1 text-2xl font-semibold">
                  {formatNumber(adminTotals?.visitors ?? 0)}
                </div>
              </div>

              <div className="rounded-[8px] border bg-card p-4">
                <div className="text-sm text-muted-foreground">Pageviews</div>
                <div className="mt-1 text-2xl font-semibold">
                  {formatNumber(adminTotals?.pageviews ?? 0)}
                </div>
              </div>
            </div>

            {/* Admin Chart */}
            {adminDaily.length === 0 ? (
              <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                No analytics data available
              </div>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <AreaChart data={adminDaily}>
                  <defs>
                    <linearGradient
                      id="fillDesktop"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={1.0}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>

                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />

                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />

                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
