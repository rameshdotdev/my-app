"use client";

import { Skeleton } from "@/components/ui/skeleton";

function SocialPillSkeleton() {
  return (
    <div className="flex items-center rounded-md bg-muted px-2 py-1 select-none">
      <Skeleton className="h-5 w-5 rounded-sm" />
      <Skeleton className="ml-1.5 h-4 w-16 rounded-md" />
    </div>
  );
}

export default function SocialsSkeleton() {
  return (
    <section id="socials">
      <div className="flex flex-col gap-2 py-4">
        {/* Heading */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex flex-wrap items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SocialPillSkeleton key={i} />
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-wrap items-center gap-2 md:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <SocialPillSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
