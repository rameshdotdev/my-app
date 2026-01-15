"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Logo =
	| string
	| {
			url: string;
			publicId: string;
	  };

interface ResumeCardProps {
	logoUrl?: Logo;
	altText: string;
	title: string;
	subtitle?: string;
	href?: string;
	badges?: readonly string[];
	period: string;
	description?: string;
}

export const ResumeCard = ({
	logoUrl,
	altText,
	title,
	subtitle,
	href,
	badges,
	period,
	description,
}: ResumeCardProps) => {
	const [isExpanded, setIsExpanded] = React.useState(false);

	const resolvedLogo = typeof logoUrl === "string" ? logoUrl : logoUrl?.url;

	const isExpandable = Boolean(description);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (isExpandable) {
			e.preventDefault();
			setIsExpanded((prev) => !prev);
		}
	};

	return (
		<Link
			href={href || "#"}
			onClick={handleClick}
			className="block focus:outline-none"
			aria-expanded={isExpanded}
		>
			<Card
				className={cn(
					"relative overflow-hidden",
					"rounded-2xl",
					"px-5 py-4 sm:px-6 sm:py-5",
					"border border-border/60",
					"bg-linear-to-br from-background via-background to-muted/30",
					"shadow-lg shadow-black/10",
					"transition-all duration-300",
					isExpandable &&
						"cursor-pointer hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
				)}
			>
				<div className="flex items-center gap-4">
					{/* ================= Logo ================= */}
					<Avatar className="size-12 shrink-0 border bg-background">
						{resolvedLogo ? (
							<AvatarImage
								src={resolvedLogo}
								alt={altText}
								className="object-contain p-1"
							/>
						) : null}
						<AvatarFallback className="text-sm font-semibold">
							{altText.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					{/* ================= Content ================= */}
					<div className="flex-1 min-w-0 group">
						<div className="flex items-start justify-between gap-4 ">
							{/* Left */}
							<div className="space-y-0.5">
								<div className="flex gap-1">
									<h3 className="text-sm sm:text-base font-semibold leading-tight">
										{title}s
									</h3>
									<ChevronRightIcon
										className={cn(
											"size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
											isExpanded ? "rotate-90" : "rotate-0",
										)}
									/>
								</div>
								{subtitle && (
									<p className="text-xs sm:text-sm text-muted-foreground">
										{subtitle}
									</p>
								)}

								{badges?.length ? (
									<div className="mt-1 flex gap-1.5 flex-wrap">
										{badges.map((badge, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="text-[10px] sm:text-xs"
											>
												{badge}
											</Badge>
										))}
									</div>
								) : null}
							</div>

							{/* Right */}
							<div className="flex items-center gap-2 shrink-0">
								<span className="text-xs sm:text-sm tabular-nums text-muted-foreground">
									{period}
								</span>
							</div>
						</div>

						{/* ================= Expandable Description ================= */}
						{isExpandable && (
							<motion.div
								initial={false}
								animate={{
									height: isExpanded ? "auto" : 0,
									opacity: isExpanded ? 1 : 0,
								}}
								transition={{
									duration: 0.45,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="overflow-hidden"
							>
								<p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
									{description}
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</Card>
		</Link>
	);
};
