import { useParallelQuery } from "./use-parallel-fetch";
import type { Hero, Skill, Project, SkillCategory } from "@/types/type";

export interface DashboardResponse {
  hero: Hero;
  skillCategory: SkillCategory[];
  skills: Skill[];
  projects: Project[];
}

export function useDashboardQuery() {
  return useParallelQuery<DashboardResponse>(["admin-dashboard"], {
    hero: "/hero",
    skillCategory: "/skill-categories",
    skills: "/skills",
    projects: "/projects",
  });
}
