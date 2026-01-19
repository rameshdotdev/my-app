import { api } from "@/lib/axios";
import { Hero } from "@/types/profile";
import { ContactData } from "@/types/type";

export const fetchHero = () => api.get<Hero>("/hero");
export const updateHero = (data: Hero) => api.put("/hero", data);

export const fetchContacts = () => api.get<ContactData>("/hero");
