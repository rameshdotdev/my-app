"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import type { AuthResponse } from "@/types/type";

export const useAuthGuard = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      if (!token) {
        setUser(null);
        setLoading(false);
        router.replace("/");
        return;
      }

      try {
        const res = await api.get<AuthResponse>("/auth/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading, isAuthenticated: !!user };
};
