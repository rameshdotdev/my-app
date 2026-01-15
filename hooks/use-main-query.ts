import { Work } from "@/types/work";
import { useParallelQuery } from "./use-parallel-fetch";
import type {
	Hero,
	Project,
	SkillCategory,
	Message,
	ContactData,
} from "@/types/type";

export interface MainResponse {
	hero: Hero;
	skills: SkillCategory[];
	projects: Project[];
	message: Message[];
	contact: ContactData;
	works: Work[];
}

export function useMaindQuery() {
	return useParallelQuery<MainResponse>(["user-page"], {
		hero: "/hero",
		skills: "/skills",
		projects: "/projects",
		contact: "/contact",
		works: "/works-at",
	});
}
