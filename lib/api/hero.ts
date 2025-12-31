import { api } from "@/lib/axios";
import { Hero } from "@/types/type";

export const fetchHero = () => api.get<Hero>("/hero");
export const updateHero = (data: Hero) => api.put("/hero", data);
