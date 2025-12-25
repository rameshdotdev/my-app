"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { AuthResponse } from "@/types/type";

export const useAuthGuard = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<AuthResponse>("/auth/me");
        setUser(res.data);
      } catch (error) {
        router.replace("/"); // replace is better for guards
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading };
};
