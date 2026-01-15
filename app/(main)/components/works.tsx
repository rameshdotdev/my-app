"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getWorksData } from "@/store/features/workSlice";
import React from "react";
import { ResumeCard } from "./resume-card";

export const Works: React.FC = () => {
	const works = useAppSelector(getWorksData);
	return (
		<section id="work">
			<div className="flex min-h-0 flex-col gap-y-3">
				<BlurFade delay={BLUR_FADE_DELAY * 5}>
					<h2 className="text-xl font-bold">places I worked for</h2>
				</BlurFade>
				{works.map((work, id) => (
					<BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
						<ResumeCard
							key={work.company}
							logoUrl={work.logoUrl?.url ?? ""}
							altText={work.company}
							title={work.company}
							subtitle={work.title}
							href={work.href}
							badges={work.badges}
							period={`${work.start} - ${work.end}`}
							description={work.description}
						/>
					</BlurFade>
				))}
			</div>
		</section>
	);
};
