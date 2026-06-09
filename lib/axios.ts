// lib/api.ts

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // keep this if you're also using cookies
});

// Automatically attach token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Generic fetch helper
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit & {
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  },
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint.replace(/^\/+/, "")}`,
    {
      ...options,
      credentials: "include",
      headers: {
        ...(options?.headers || {}),
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
}
