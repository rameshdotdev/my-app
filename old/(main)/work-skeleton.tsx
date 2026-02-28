"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const WorksSkeleton = () => {
	return (
		<section id="work">
			<div className="flex min-h-0 flex-col gap-y-3">
				{/* Section title */}
				<Skeleton className="h-6 w-48" />

				{/* Resume cards */}
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="
              rounded-2xl
              border border-border/60
              px-5 py-4 sm:px-6 sm:py-5
              bg-background
              shadow-lg
            "
					>
						<div className="flex items-center gap-4">
							{/* Logo */}
							<Skeleton className="h-12 w-12 rounded-full shrink-0" />

							{/* Content */}
							<div className="flex-1 space-y-2">
								{/* Title + period row */}
								<div className="flex items-center justify-between gap-4">
									<Skeleton className="h-4 w-40" />
									<Skeleton className="h-4 w-32" />
								</div>

								{/* Subtitle */}
								<Skeleton className="h-3 w-32" />

								{/* Badges */}
								<div className="flex gap-2">
									<Skeleton className="h-4 w-12 rounded-full" />
									<Skeleton className="h-4 w-14 rounded-full" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
