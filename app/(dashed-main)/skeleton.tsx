"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/utils";

export function ProfileSkeleton() {
  return (
    <div className="relative flex items-stretch justify-between">
      {/* Left */}
      <div className="flex items-end gap-3">
        {/* Profile Image */}
        <div>
          <div className="relative rounded-[12px] border border-border p-1">
            <Skeleton className="size-25 md:size-29 rounded-[8px]" />
            {/* OfflineStatusTooltip placeholder dot */}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-border bg-muted" />
          </div>
        </div>

        {/* Name + Title */}
        <div className="flex h-full flex-col justify-between py-1 select-none">
          {/* SwitchProfile placeholder */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
          </div>

          <div>
            {/* Name */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 md:w-40 rounded-md" />
              {/* Verified badge placeholder */}
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>

            {/* Title typing placeholder */}
            <div className="mt-1">
              <Skeleton className="h-4 w-22 md:w-44 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end justify-between">
        {/* ThemeToggle placeholder */}
        <Skeleton className="h-9 w-9 rounded-md" />

        {/* Visitor Count */}
        <div
          title="Visitor Count"
          className={cn(
            "-mb-1 md:-mb-0.9 flex items-center justify-center gap-1.5",
            "font-medium text-muted-foreground select-none",
          )}
        >
          <Eye className="h-4 w-4 mt-1 opacity-60" />
          <Skeleton className="h-4 w-10 rounded-md" />
        </div>
      </div>

      {/* ImagePreviewModal not rendered in skeleton */}
    </div>
  );
}

export function AboutSkeleton() {
  const isSmallMobile = useMediaQuery("(max-width: 372px)");
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        <div>
          <Skeleton className="h-4 w-full rounded-md mb-1" />
          <Skeleton className="h-4 w-full rounded-md mb-1" />
          <br />
          <Skeleton className="h-4 w-full rounded-md mb-1" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
      </div>
      <div>
        <div
          className={`flex ${isSmallMobile ? "flex-col" : ""} pt-4.5 gap-2 select-none`}
        >
          <Skeleton className="h-9 rounded w-full sm:w-40" />
          <Skeleton className="h-9 rounded w-full sm:w-40" />
        </div>
      </div>
    </div>
  );
}

function ProjectCardSkeleton({ idx }: { idx: number }) {
  const showMobileSeparator = idx !== 3 && idx % 2 === 0;

  return (
    <div>
      <div className="relative z-10 p-3">
        <BlurFade delay={BLUR_FADE_DELAY * (idx + 1)}>
          <div className="group flex w-full flex-col gap-2">
            {/* Card */}
            <div className="rounded-[12px] border border-border p-[4px]">
              <div className="relative h-[200px] w-full overflow-hidden rounded-[8px] border border-border bg-muted/40 select-none sm:h-[170px] md:h-[200px]">
                {/* Subtitle skeleton */}
                <div className="absolute left-2 top-2 h-4 w-24 rounded bg-muted animate-pulse" />

                {/* Preview container */}
                <div className="absolute bottom-0 left-1/2 h-[75%] w-[80%] -translate-x-1/2 rounded-t-[6px] bg-background p-[2px] pb-0">
                  <div className="h-full w-full overflow-hidden rounded-t-[4px] bg-muted animate-pulse" />
                </div>

                {/* Pin skeleton */}
                <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-muted animate-pulse" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                <div className="h-4 w-4 rounded bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* dashed separator (mobile only) */}
      {showMobileSeparator && (
        <div className="block md:hidden">
          <HorizontalDashedBorder />
        </div>
      )}
    </div>
  );
}

export function ProjectsGridListSkeleton() {
  return (
    <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-2">
      {/* Middle dashed horizontal line (desktop) */}
      <div className="absolute left-0 top-1/2 z-0 hidden w-full -translate-y-1/2 md:block">
        <HorizontalDashedBorder />
      </div>

      {/* Middle dashed vertical line (desktop) */}
      <div className="absolute inset-y-0 hidden sm:left-1/2 -translate-x-1/2 sm:block">
        <VerticalDashedBorder />
      </div>

      {Array.from({ length: 4 }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} idx={idx} />
      ))}
    </div>
  );
}
