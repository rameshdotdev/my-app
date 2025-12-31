import { useParallelQuery } from "./use-parallel-fetch";
import type { Hero, Project, SkillCategory, Message } from "@/types/type";

export interface MainResponse {
  hero: Hero;
  skills: SkillCategory[];
  projects: Project[];
  contacts: Message[];
}

export function useMaindQuery() {
  return useParallelQuery<MainResponse>(["user-page"], {
    hero: "/hero",
    skills: "/skills",
    projects: "/projects",
  });
}
