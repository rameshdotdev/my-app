// lib/api/Project.ts
import { api } from "@/lib/axios";
import {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types/project";

export async function createProject(payload: CreateProjectPayload) {
  const { data } = await api.post<Project>("/projects", payload);
  return data;
}

export async function updateProject(id: string, payload: UpdateProjectPayload) {
  const { data } = await api.put<Project>(`/projects/${id}`, payload);
  return data;
}

export async function selectProjects() {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}

export async function deleteProject(id: string) {
  const { data } = await api.delete<{ success: boolean }>(`/projects/${id}`);
  return data;
}
