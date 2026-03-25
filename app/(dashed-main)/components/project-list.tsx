"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/utils";

import Pin from "./pin";
import { StatusDot } from "./status-dot";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { selectProjects, setProjects } from "@/store/features/projectSlice";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { Project } from "@/types/project";

export const bgImages = [
  "/projects/bg1.avif",
  "/projects/bg2.jpg",
  "/projects/bg3.avif",
  "/projects/bg4.png",
  "/projects/bg6.png",
  "/projects/bg7.png",
  "/projects/bg10.png",
  "/projects/bg11.png",
];

export function getRandomBgImage(images: string[] = bgImages) {
  if (!images.length) return "";
  return images[Math.floor(Math.random() * images.length)];
}

export default function ProjectsGridList() {
  const { data } = useFetch<Project[]>("/projects", {
    revalidate: 120,
    tags: ["projects"],
  });
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);

  // pinned first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return 0;
  });

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch]);
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

      {sortedProjects.slice(0, 4).map((project, idx) => {
        const bgImage = getRandomBgImage();

        const shortDescription =
          project.description?.[0] ?? "No description added";
        // show separator for first 3 items (mobile only)
        const showMobileSeparator = idx <= 2;
        return (
          <div key={project._id}>
            <div className="relative z-10 p-6">
              <BlurFade delay={BLUR_FADE_DELAY * (idx + 1)}>
                <Link
                  href={`/projects/${project._id}`}
                  className="group flex w-full cursor-pointer flex-col gap-2"
                >
                  <div className="rounded-[12px] border border-border p-[4px]">
                    <div className="relative h-[200px] w-full overflow-hidden rounded-[8px] border border-border bg-muted/40 select-none sm:h-[170px] md:h-[200px]">
                      {/* Hover BG */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          backgroundImage: `url(${bgImage})`,
                        }}
                      />

                      {/* Subtitle */}
                      <h1 className="absolute left-2 top-2 text-xs font-medium text-muted-foreground transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:text-foreground">
                        {project.subTitle}
                      </h1>

                      {/* Preview */}
                      <div className="absolute bottom-0 left-1/2 h-[75%] w-[80%] -translate-x-1/2 rounded-t-[6px] bg-background p-[2px] pb-0 transition-all duration-300 group-hover:h-[70%]">
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

                      {/* Pin icon */}
                      {project.isPinned && <Pin />}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[1.10rem] font-bold leading-[1.10] text-foreground">
                        {project.title}
                      </h3>

                      <StatusDot status={project.status} hotspot />
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {shortDescription}
                    </p>

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

            {/* dashed separator (mobile only) */}
            {showMobileSeparator && (
              <div className="block md:hidden">
                <HorizontalDashedBorder />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
