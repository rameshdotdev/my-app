"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export default function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Accessibility: respect reduced motion
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setMeteors([]);
      return;
    }

    const createMeteors = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? Math.floor(number / 2) : number;

      const styles = Array.from({ length: count }).map(() => {
        const size = Math.random() > 0.75 ? 0.75 : 0.5;
        const opacity = Math.random() * 0.4 + 0.4;
        const angle = 200 + Math.random() * 30;

        return {
          top: `${Math.random() * -20}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          transform: `rotate(${angle}deg)`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${Math.random() * 5 + 5}s`,
        } as React.CSSProperties;
      });

      setMeteors(styles);
    };

    createMeteors();
    window.addEventListener("resize", createMeteors);

    return () => window.removeEventListener("resize", createMeteors);
  }, [number]);

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            "pointer-events-none absolute rounded-full",
            "bg-foreground/70",
            "animate-meteor",
            className
          )}
        >
          {/* Tail */}
          <span className="absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-foreground/70 to-transparent" />
        </span>
      ))}
    </>
  );
}
