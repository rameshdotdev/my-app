"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50
        border border-border rounded-[10px] p-[2px]
        shadow-lg group cursor-pointer
        transition-all duration-500 ease-out
        ${visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95 pointer-events-none"}
      `}
    >
      <div
        className="
        flex items-center justify-center
        rounded-[8px] border border-border
        w-full h-full p-1.5
        bg-nonHover group-hover:bg-hover
        transition-all duration-300
      "
      >
        <ArrowUp className="size-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}