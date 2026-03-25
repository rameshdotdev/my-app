"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Mail } from "lucide-react";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import ProjectActionsBtn from "../../components/action-btn-project";
import { StatusDot } from "../../components/status-dot";
import ProjectTeckStackChips from "../../components/project-teck-stack";
import { useAppSelector } from "@/hooks/hooks";
import { selectProjectById } from "@/store/features/projectSlice";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import Title from "../../components/title";
import { ProjectCard } from "@/components/project-card/components";

export default function Page() {
  const params = useParams<{ id: string }>();
  const project = useAppSelector(selectProjectById(params.id));
  if (!project) return notFound();

  return (
    <>
      <Title title="Projects" isSubPage />

      <VerticalDashedBorderLayout className="p-0">
        <div className="flex flex-col items-start">
          {/* Media */}
          <div className="px-4 w-full p-4">
            <div className="w-full h-full md:min-h-85 min-h-60 rounded-[8px] relative border border-border p-1.5 overflow-hidden">
              {/* Light */}
              <Image
                alt={project.title}
                src={project.image.light.url}
                width={1000}
                height={1000}
                priority={false}
                className="block dark:hidden w-full object-cover md:h-105 h-60 rounded-[8px] border border-border"
              />

              {/* Dark */}
              <Image
                alt={project.title}
                src={project.image.dark.url}
                width={1000}
                height={1000}
                priority={false}
                className="hidden dark:block w-full object-cover md:h-105 h-60 rounded-[8px] border border-border"
              />
            </div>
          </div>

          <ProjectActionsBtn
            githubUrl={project.links.github}
            websiteUrl={project.links.site}
            postUrl={project.links.post}
          />

          {/* Content */}
          <div className="flex flex-col w-full gap-1.5 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.40rem] font-bold leading-tight text-title">
                {project.title}
              </h1>

              <StatusDot status={project.status} hotspot />
            </div>

            <div className="text-base text-foreground [&>p]:mb-3 [&>p:last-child]:mb-0">
              {project.description?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Optional: show contact only when building */}
            {project.status === "building" && (
              <div className="flex items-center gap-1">
                <p className="text-foreground flex items-center gap-1">
                  For early access, please{" "}
                  <a
                    className="group text-strong transition-colors duration-300 inline-flex items-center"
                    href="mailto:ittsramesh.com"
                  >
                    <span className="relative">
                      contact me!
                      <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </span>
                    <Mail className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-4 w-4" />
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* dashed divider */}
          <HorizontalDashedBorder />
          <ProjectTeckStackChips stack={project.stack} />
          {/* dashed divider */}
          <HorizontalDashedBorder />
          {/* Chat Section */}
          <ProjectCard.ChatProvider
            projectContext={{
              title: project.title,
              excerpt: project.description?.join(" ") || "",
              github: project.links.github!,
            }}
          >
            <div className="w-full flex flex-col">
              <ProjectCard.ChatMessages />
              <ProjectCard.ChatInputWrapper>
                <ProjectCard.ChatInput
                  placeholder="Ask Gemini about this project."
                  autoFocus
                />
              </ProjectCard.ChatInputWrapper>
            </div>
          </ProjectCard.ChatProvider>
        </div>
      </VerticalDashedBorderLayout>
    </>
  );
}
