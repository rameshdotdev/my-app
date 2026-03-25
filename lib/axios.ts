import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// lib/api.ts
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit & {
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  },
): Promise<T> {
  const res = await fetch(`/api${endpoint}`, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
