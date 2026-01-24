"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

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
