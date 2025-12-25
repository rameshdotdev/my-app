"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { removeUser } from "@/store/features/userSlice";
import { useAppDispatch } from "./hooks";

type LogoutStatus = "idle" | "loading" | "success" | "error";

export function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<LogoutStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      await api.post("/auth/logout");

      // 🔥 reset redux state
      dispatch(removeUser());

      setStatus("success");
      toast.success("Logged out successfully");
      router.replace("/");
      router.refresh();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Logout failed. Try again.";

      setStatus("error");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    status,
    error,
  };
}
