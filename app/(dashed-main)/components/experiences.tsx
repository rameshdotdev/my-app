"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function ExperienceCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="m-1">
      <div className="flex flex-col">
        {/* Header */}
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="group flex w-full cursor-pointer select-none flex-row justify-between gap-4 p-3 text-left transition-colors duration-300 hover:bg-muted/50"
        >
          <div className="flex flex-1 items-center gap-3 truncate sm:truncate-none">
            {/* Logo */}
            <div className="shrink-0 size-11 sm:size-12 overflow-hidden rounded-[10px] border border-border bg-background p-[2px] flex items-center justify-center">
              <Image
                src="/blur.webp"
                alt="Why boi?"
                width={56}
                height={56}
                draggable={false}
                className="h-full w-full rounded-[8px] border border-border object-cover"
              />
            </div>

            {/* Left content */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[1.05rem] sm:text-[1.20rem] leading-[0.90] font-semibold text-foreground">
                  Why boi?
                </h3>

                <span className="rounded-[4px] border border-border px-1 py-0 text-xs font-medium text-muted-foreground">
                  Full Time
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Software Engineer
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs sm:text-sm font-medium text-foreground">
                Aug, 2025 - Present
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Palo Alto, USA - Remote
              </p>
            </div>

            <div className="hidden sm:block">
              <ChevronDown
                className={`h-[18px] w-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>
        </button>

        {/* Expand / Collapse */}
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[520px] opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {[
              "Owned the core presentation editor, driving major performance and reliability improvements",
              "Designed and built core editor features like drag-and-drop, resize, and keyboard shortcuts end-to-end",
              "Owned a foundational refactor, strengthening a critical codebase to enable safer and faster production",
              "Drove major Drive page performance improvements, resolving bugs to deliver faster, reliable experiences",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 text-muted-foreground">•</span>
                <p className="text-sm leading-relaxed text-foreground">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="my-3 flex flex-wrap items-center gap-1.5 select-none">
            {[
              "Next",
              "Tailwind",
              "TypeScript",
              "JavaScript",
              "Express",
              "PostgreSQL",
              "Docker",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] border border-border bg-muted/40 px-1.5 py-0.5 text-xs text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dashed border line */}
        <div
          className="w-full h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, hsl(var(--border)) 0px, hsl(var(--border)) 6px, transparent 6px, transparent 14px)",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
