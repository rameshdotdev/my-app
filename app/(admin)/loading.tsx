"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r p-4 gap-4">
        <Skeleton className="h-6 w-32 mb-6" />

        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}

        <div className="mt-auto">
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md md:rounded-tl-xl md:rounded-tr-xl">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            {/* Sidebar trigger */}
            <Skeleton className="h-8 w-8 rounded-md" />

            {/* Separator */}
            <Skeleton className="mx-2 h-4 w-px" />

            {/* Title */}
            <Skeleton className="h-5 w-28" />

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Theme toggle */}
              <Skeleton className="h-8 w-8 rounded-md" />

              {/* Separator */}
              <Skeleton className="mx-2 h-4 w-px" />

              {/* Avatar */}
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>

        {/* Tabs + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: 6 }).map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
            >
              {Array.from({ length: 6 }).map((_, col) => (
                <Skeleton key={col} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
