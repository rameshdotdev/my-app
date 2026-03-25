"use client";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import Title from "../components/title";
import { useAppSelector } from "@/hooks/hooks";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import { selectProjects } from "@/store/features/projectSlice";
import { isLastItem } from "@/lib/utils";
import ComingSoon from "./coming-soon";
import { SocialCTA } from "../components/social-cta";
import { ProjectsGridListSkeleton } from "../skeleton";
import { ProjectCard } from "@/components/project-card";

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
              const showMobileSeparator = idx !== sortedProjects.length - 1;

              return (
                <>
                  <div>
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={idx}
                    />

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
