"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/types/project";

type StatusDotProps = {
  status: ProjectStatus;
  hotspot?: boolean; // true => blink/pulse animation
  className?: string;
};

const statusStyles: Record<
  ProjectStatus,
  { ring: string; dot: string; label: string }
> = {
  live: {
    ring: "bg-emerald-500/40",
    dot: "fill-emerald-500 text-emerald-500",
    label: "Live",
  },
  building: {
    ring: "bg-yellow-500/40",
    dot: "fill-yellow-500 text-yellow-500",
    label: "Building",
  },
  offline: {
    ring: "bg-destructive/50",
    dot: "fill-destructive text-destructive",
    label: "Offline",
  },
};

export function StatusDot({
  status,
  hotspot = true,
  className,
}: StatusDotProps) {
  const styles = statusStyles[status];

  return (
    <div className="flex items-center gap-2 pr-1 select-none">
      <div
        className={cn("relative flex items-center justify-center", className)}
        aria-label={`Status: ${styles.label}`}
        title={styles.label}
      >
        {/* Hotspot ring - Smoother animation */}
        {hotspot && (
          <>
            {/* Primary ring */}
            <motion.span
              className={cn(
                "absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                styles.ring,
              )}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.4, 1],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />

            {/* Secondary ring for smoother feel */}
            <motion.span
              className={cn(
                "absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                styles.ring,
              )}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.8, 1],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.7, 1],
                delay: 0.5,
              }}
            />
          </>
        )}

        {/* Solid dot with subtle pulse */}
        <motion.div
          animate={
            hotspot
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={
            hotspot
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
        >
          <Circle className={cn("relative z-10 size-2", styles.dot)} />
        </motion.div>
      </div>

      <p className="text-sm text-mutedForeground font-medium capitalize">
        {status}
      </p>
    </div>
  );
}
