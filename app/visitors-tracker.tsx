"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisitor } from "@/lib/api/track-visitors";

export default function VisitorTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    trackVisitor(pathname);
  }, [pathname]);

  return null;
}
