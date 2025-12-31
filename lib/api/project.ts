// lib/api/Project.ts
import { api } from "@/lib/axios";
import { Project } from "@/types/type";

export const createProject = (data: Partial<Project>) =>
  api.post("/projects", data);

export const updateProject = (id: string, data: Partial<Project>) =>
  api.put(`/projects/${id}`, data);

export const toggleProjectStatus = (id: string) =>
  api.put(`/projects/status/${id}`);

export const deleteProject = (id: string) => api.delete(`/projects/${id}`);
