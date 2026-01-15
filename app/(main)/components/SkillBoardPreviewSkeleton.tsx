"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkillBoardPreviewSkeleton() {
	return (
		<section id="skills" className="space-y-10">
			{/* ================= Section Header ================= */}
			<div className="max-w-3xl mx-auto md:text-center space-y-4">
				{/* Title */}
				<div className="relative inline-block">
					<Skeleton className="h-9 w-64 sm:h-10 sm:w-80 mx-auto" />
					{/* underline placeholder */}
					<Skeleton className="absolute -bottom-2 left-0 h-1 w-full rounded-full" />
				</div>

				{/* Subtitle */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-full max-w-2xl mx-auto" />
					<Skeleton className="h-4 w-5/6 max-w-xl mx-auto" />
				</div>
			</div>

			{/* ================= Skills Grid ================= */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="h-full">
						<Card
							className="
                h-full
                rounded-2xl
                border border-border/50
                overflow-hidden
              "
						>
							{/* -------- Card Header -------- */}
							<CardHeader className="pb-4">
								<div className="flex items-center justify-center gap-3">
									{/* Icon box */}
									<Skeleton className="h-10 w-10 rounded-xl" />

									<div className="space-y-2">
										{/* Category title */}
										<Skeleton className="h-5 w-32" />
										{/* Subtitle badge */}
										<Skeleton className="h-4 w-20 rounded-full" />
									</div>
								</div>
							</CardHeader>

							{/* -------- Card Content -------- */}
							<CardContent className="pt-0">
								<div className="grid grid-cols-3 gap-4">
									{Array.from({ length: 6 }).map((_, j) => (
										<div
											key={j}
											className="
                        flex flex-col items-center
                        p-3 rounded-xl
                        border border-border/30
                      "
										>
											{/* Skill icon */}
											<Skeleton className="h-12 w-12 rounded-lg mb-2" />
											{/* Skill name */}
											<Skeleton className="h-3 w-14" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</section>
	);
}
