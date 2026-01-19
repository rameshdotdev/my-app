"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";
import { DotBackground } from "@/components/dot-background";
import SkillBoardPreviewSkeleton from "./SkillBoardPreviewSkeleton";
import { WorksSkeleton } from "../work-skeleton";

const HeroSkeleton = () => {
  return (
    <DotBackground gridSize={32} className="min-h-screen">
      <section
        id="home"
        className="relative max-w-[95%] lg:max-w-[80%] mx-auto space-y-8 pt-10 md:pt-24"
      >
        <div className="grid items-center md:grid-cols-2 md:gap-12">
          {/* ================= LEFT ================= */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 flex-col space-y-2">
              <CardContent className="px-0 text-center md:text-left">
                {/* Greeting */}
                <Skeleton className="h-4 w-24 md:mx-0" />

                {/* Name */}
                <Skeleton className="mx-auto mt-2 h-10 w-56 sm:h-14 sm:w-80 md:mx-0 mb-2" />

                {/* Typing (desktop) */}
                <div className="hidden md:flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>

                {/* Description (desktop) */}
                <div className="hidden md:block pt-4 space-y-2">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <Skeleton className="h-4 w-full max-w-sm" />
                  <Skeleton className="h-4 w-3/4 max-w-xs" />
                </div>

                {/* CTA Buttons (desktop) */}
                <div className="hidden md:flex mt-8 flex-col gap-4 sm:flex-row">
                  <Skeleton className="h-12 w-full rounded-[8px] sm:w-48" />
                  <Skeleton className="h-12 w-full rounded-[8px] sm:w-40" />
                </div>
              </CardContent>
            </div>

            {/* Avatar (mobile) */}
            <div className="relative h-32 w-32 md:hidden">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
          </div>

          {/* Typing (mobile) */}
          <div className="relative md:hidden mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          {/* About (mobile) */}
          <section className="md:hidden pt-6 space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />

            <div className="mt-6 flex gap-4">
              <Skeleton className="h-12 w-full rounded-[8px]" />
              <Skeleton className="h-12 w-full rounded-[8px]" />
            </div>
          </section>

          {/* ================= RIGHT ================= */}
          <div className="hidden md:flex justify-end">
            <div className="relative h-72 w-72 lg:h-80 lg:w-80">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Collaborate section placeholder */}
        <div className="space-y-4 md:space-y-6">
          {/* Heading */}
          <Skeleton className="h-6 w-56" />

          {/* Social icons row */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-[8px]" />
            ))}
          </div>
        </div>
        <WorksSkeleton />
        <SkillBoardPreviewSkeleton />
      </section>
    </DotBackground>
  );
};

export default HeroSkeleton;
