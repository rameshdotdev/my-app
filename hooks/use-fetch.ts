"use client";

import { useEffect, useState } from "react";

interface UseFetchOptions {
  revalidate?: number;
  tags?: string[];
  enabled?: boolean;
}

export function useFetch<T>(endpoint: string, options?: UseFetchOptions) {
  const { enabled = true } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`/api${endpoint}`, {
          credentials: "include",
          next: {
            revalidate: options?.revalidate ?? 60, // default cache 60s
            tags: options?.tags,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, enabled]);

  return { data, loading, error };
}
