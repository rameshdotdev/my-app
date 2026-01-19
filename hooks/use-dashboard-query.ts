import { Work } from "@/types/work";
import { useParallelQuery } from "./use-parallel-fetch";
import type {
  Project,
  SkillCategory,
  Message,
  AuthResponse,
  ContactData,
} from "@/types/type";
import { Hero } from "@/types/profile";

export interface DashboardResponse {
  user: AuthResponse;
  hero: Hero;
  skillCategory: SkillCategory[];
  skills: SkillCategory[];
  projects: Project[];
  messages: Message[];
  contact: ContactData;
  works: Work[];
}

export function useDashboardQuery() {
  return useParallelQuery<DashboardResponse>(["admin-dashboard"], {
    user: "/auth/me",
    hero: "/hero",
    skillCategory: "/skill-categories",
    skills: "/skills",
    projects: "/projects",
    messages: "/message",
    contact: "/contact",
    works: "/works-at",
  });
}
