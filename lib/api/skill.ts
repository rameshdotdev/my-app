// lib/api/skill.ts
import { api } from "@/lib/axios";
import { Skill, SkillCategory } from "@/types/type";

export const createCategory = async (data: Partial<SkillCategory>) =>
  api.post("/skill-categories", data);

export const updateCategory = async (
  id: string,
  data: Partial<SkillCategory>
) => api.put(`/skill-categories/${id}`, data);

export const deleteCategory = async (id: string) =>
  api.delete(`/skill-categories/${id}`);

export const createSkill = (data: Partial<Skill>) => api.post("/skills", data);

export const updateSkill = (id: string, data: Partial<Skill>) =>
  api.put(`/skills/${id}`, data);

export const deleteSkill = (id: string) => api.delete(`/skills/${id}`);
