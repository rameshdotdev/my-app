// components/project-card.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import BlurFade from "../magicui/blur-fade";
import { StatusDot } from "@/app/(dashed-main)/components/status-dot";
import { Project } from "@/types/project";
import { getRandomBgImage } from "@/app/(dashed-main)/components/project-list";
import { cn } from "@/lib/utils";
import Pin from "@/app/(dashed-main)/components/pin";

type Variant = "default" | "compact";

interface ProjectCardProps {
  project: Project;
  variant?: Variant;
  index?: number;
  blurDelay?: number;
  href?: string;
}

export function ProjectCard({
  project,
  variant = "default",
  index = 0,
  blurDelay = 0.1,
  href,
}: ProjectCardProps) {
  const shortDescription = useMemo(() => {
    return project.description?.[0] ?? "";
  }, [project.description]);
  const bgImage = getRandomBgImage();
  const isCompact = variant === "compact";
  return (
    <div className={cn("relative z-10", !isCompact && "p-6")}>
      <BlurFade delay={blurDelay * (index + 1)}>
        <Link
          href={href ?? `/projects/${project._id}`}
          className="group flex w-full cursor-pointer flex-col gap-2"
        >
          {/* Card */}
          <div className="rounded-[12px] border border-border p-[4px]">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-[8px] border border-border bg-muted/40 select-none",
                isCompact ? "h-[140px]" : "h-[200px] sm:h-[170px] md:h-[200px]",
              )}
            >
              {/* Hover BG */}
              {bgImage && !isCompact && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
              )}

              {/* Subtitle */}
              {!isCompact && (
                <h1 className="absolute left-2 top-2 text-xs font-medium text-muted-foreground transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:text-foreground">
                  {project.subTitle}
                </h1>
              )}

              {/* Preview */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 rounded-t-[6px] bg-background p-[2px] pb-0 transition-all duration-300",
                  isCompact
                    ? "bottom-0 h-[80%] w-[90%]"
                    : "bottom-0 h-[75%] w-[80%] group-hover:h-[70%]",
                )}
              >
                <div className="h-full w-full overflow-hidden rounded-t-[4px]">
                  {/* Dark */}
                  <div className="hidden dark:block">
                    <Image
                      src={project.image.dark.url}
                      alt="Dark Screenshot"
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Light */}
                  <div className="block dark:hidden">
                    <Image
                      src={project.image.light.url}
                      alt="Light Screenshot"
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Pin */}
              {project.isPinned && !isCompact && <Pin />}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 px-2">
            <div className="flex items-center justify-between">
              <h3
                className={cn(
                  "font-bold text-foreground",
                  isCompact
                    ? "text-sm leading-tight"
                    : "text-[1.10rem] leading-[1.10]",
                )}
              >
                {project.title}
              </h3>

              <StatusDot status={project.status} hotspot />
            </div>

            {!isCompact && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {shortDescription}
              </p>
            )}

            <div className="flex items-center gap-1 select-none">
              <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                View Project
              </p>
              <ArrowUpRight className="h-[14px] w-[14px] text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
            </div>
          </div>
        </Link>
      </BlurFade>
    </div>
  );
}
