import axios from "axios";
import { API_URL } from "./env";

export const api = axios.create({
  baseURL: API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const skipAuth = (config as any).skipAuth;

  if (!skipAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
