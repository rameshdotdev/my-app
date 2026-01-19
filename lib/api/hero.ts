import { api } from "@/lib/axios";
import { ContactData, Hero } from "@/types/profile";

export const fetchHero = () => api.get<Hero>("/hero");
export const updateHero = (data: Hero) => api.put("/hero", data);

export const fetchContacts = () => api.get<ContactData>("/hero");
