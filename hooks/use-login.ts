"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type LoginStatus = "idle" | "loading" | "success" | "error";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      setStatus("success");
      toast.success("Welcome back 👋");
      console.log(res);
      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Invalid email or password";
      setStatus("error");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    status,
    error,
  };
}
