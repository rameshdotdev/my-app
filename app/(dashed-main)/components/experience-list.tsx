"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type ExperienceListProps = {
  logo: string;
  alt: string;
  company: string;
  type?: string;
  href?: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
  tags: string[];

  isOpen: boolean;
  onToggle: () => void;
};

export default function ExperienceList({
  logo,
  alt,
  company,
  type,
  href,
  role,
  duration,
  location,
  points,
  tags,
  isOpen,
  onToggle,
}: ExperienceListProps) {
  return (
    <div className="m-1">
      <div className="flex flex-col">
        {/* Header */}
        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full cursor-pointer select-none flex-row justify-between gap-4 p-3 text-left transition-colors duration-300 hover:bg-muted/50"
        >
          <div className="flex flex-1 items-center gap-3 truncate sm:truncate-none">
            {/* Logo */}
            <div className="shrink-0 size-11 overflow-hidden rounded-[10px] border border-border bg-background p-[2px] flex items-center justify-center sm:size-12">
              <Image
                src={logo}
                alt={alt}
                width={56}
                height={56}
                draggable={false}
                className="h-full w-full rounded-[8px] border border-border object-contain"
              />
            </div>

            {/* Left content */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <Link target="_blank" href={href ?? "#"}>
                  <h3
                    className="md:min-w-[130px] text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem] transition-colors hover:text-blue-500
                "
                  >
                    {company}
                  </h3>
                </Link>

                <span className="hidden md:inline-block rounded-[4px] border border-border px-1 py-0 text-[10px] font-medium text-muted-foreground">
                  {type}
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground sm:text-sm">
                {role}
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-medium text-foreground sm:text-sm">
                {duration}
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-sm">
                {location}
              </p>
            </div>

            <div className="hidden sm:block">
              <ChevronDown
                className={`h-[18px] w-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>
        </button>

        {/* Expand / Collapse */}
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "mt-1 max-h-[520px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          {/* Points */}
          <div className="flex flex-col gap-2">
            {points?.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 text-muted-foreground">•</span>
                <p className="text-sm leading-relaxed text-foreground">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="my-3 flex select-none flex-wrap items-center gap-1.5">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dashed border line */}
        <div
          className="h-px w-full"
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
