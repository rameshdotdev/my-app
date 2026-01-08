import { useParallelQuery } from "./use-parallel-fetch";
import type {
  Hero,
  Project,
  SkillCategory,
  Message,
  AuthResponse,
} from "@/types/type";

export interface DashboardResponse {
  user: AuthResponse;
  hero: Hero;
  skillCategory: SkillCategory[];
  skills: SkillCategory[];
  projects: Project[];
  contacts: Message[];
}

export function useDashboardQuery() {
  return useParallelQuery<DashboardResponse>(["admin-dashboard"], {
    user: "/auth/me",
    hero: "/hero",
    skillCategory: "/skill-categories",
    skills: "/skills",
    projects: "/projects",
    contacts: "/contacts",
  });
}
