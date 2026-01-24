import { Work } from "@/types/work";
import { useParallelQuery } from "./use-parallel-fetch";
import type { Project, SkillCategory, ContactData } from "@/types/type";

import { Hero } from "@/types/profile";
import { visitors } from "@/store/features/visitorSlice";
import { WakaTimeYesterdayResponse } from "@/types/wakatime";
export interface MainResponse {
  hero: Hero;
  contact: ContactData;
  visitor: visitors;
  yesterday: WakaTimeYesterdayResponse;
  works: Work[];
  skills: SkillCategory[];
  projects: Project[];
}

export function useMaindQuery() {
  return useParallelQuery<MainResponse>(["user-page"], {
    hero: "/hero",
    visitor: "/visitor",
    contact: "/contact",
    yesterday: "/worked-for/yesterday",
    works: "/works-at",
    skills: "/skills",
    projects: "/projects",
  });
}
