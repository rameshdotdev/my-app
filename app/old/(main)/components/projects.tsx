"use client";
import { useAppSelector } from "@/hooks/hooks";
import { selectProjects } from "@/store/features/projectSlice";

export default function ProjectsPage() {
  const projects = useAppSelector(selectProjects);
  return <></>;
}
