"use client";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import Title from "../components/title";
import { useAppSelector } from "@/hooks/hooks";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import { getRandomBgImage } from "../components/project-list";
import { selectProjects } from "@/store/features/projectSlice";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StatusDot } from "../components/status-dot";
import Pin from "../components/pin";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { BLUR_FADE_DELAY, isLastItem, isSecondLastItem } from "@/lib/utils";
import ComingSoon from "./coming-soon";
import { SocialCTA } from "../components/social-cta";
import { ProjectsGridListSkeleton } from "../skeleton";

export default function Page() {
  const projects = useAppSelector(selectProjects);

  // pinned first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return 0;
  });
  return (
    <>
      <Title title="Projects" isSubPage />
      <VerticalDashedBorderLayout className="p-0">
        {projects.length === 0 ? (
          <ProjectsGridListSkeleton />
        ) : (
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-2">
            {/* Middle dashed vertical line (desktop) */}
            <div className="absolute inset-y-0 hidden sm:left-1/2 -translate-x-1/2 sm:block">
              <VerticalDashedBorder />
            </div>

            {sortedProjects.map((project, idx) => {
              const bgImage = getRandomBgImage();

              const shortDescription =
                project.description?.[0] ?? "No description added";

              const showMobileSeparator = idx !== sortedProjects.length - 1;

              return (
                <>
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

                    {!isLastItem(idx, sortedProjects) && (
                      <div className="w-full hidden md:block">
                        <HorizontalDashedBorder />
                      </div>
                    )}
                    {/* dashed separator (mobile only) */}
                    {showMobileSeparator && (
                      <div className="block md:hidden">
                        <HorizontalDashedBorder />
                      </div>
                    )}
                  </div>
                  {sortedProjects.length === idx + 1 && <ComingSoon />}
                </>
              );
            })}
          </div>
        )}
        <HorizontalDashedBorder />
        <SocialCTA
          labelDesktop="For more cool projects, visit my"
          labelMobile="For more projects, visit my"
          text="Github"
          href="https://github.com/rameshdotdev"
        />
      </VerticalDashedBorderLayout>
    </>
  );
}
