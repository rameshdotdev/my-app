"use client";

import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

interface UseScrollDirectionOptions {
  threshold?: number;
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 10 } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // 🔑 sync initial scroll state
    setIsScrolled(lastScrollY > threshold);

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > threshold);

      if (Math.abs(scrollY - lastScrollY) < 5) return;

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", updateScrollDirection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [threshold]);

  return { scrollDirection, isScrolled };
}
