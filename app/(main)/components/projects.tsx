"use client";
import { useAppSelector } from "@/hooks/hooks";
import { ProjectsGrid } from "./project-grid";
import { getProjects } from "@/store/features/projectSlice";

export default function ProjectsPage() {
  const projects = useAppSelector(getProjects);
  return <ProjectsGrid projects={projects} />;
}
