"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";

type Education = {
  logo: string;
  alt: string;
  college: string;
  type?: string;
  degree: string;
  duration: string;
  location: string;
  href?: string;
};

export default function EducationCard({
  logo,
  alt,
  college,
  type,
  degree,
  duration,
  location,
  href,
}: Education) {
  const isMobile = useIsMobile();
  function truncateText(text: string, maxChars = 30) {
    if (!text) return "";
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trimEnd() + "...";
  }

  return (
    <div className="m-1">
      <div className="flex flex-col">
        {/* Header */}
        <div className="group flex w-full cursor-pointer select-none flex-row justify-between gap-4 p-3 text-left transition-colors duration-300 hover:bg-muted/50">
          <div className="flex flex-1 items-center gap-3 truncate sm:truncate-none">
            {/* Logo */}
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-background p-[2px] sm:size-12">
              <Image
                src={logo}
                alt={alt}
                width={56}
                height={56}
                draggable={false}
                className="h-full w-full rounded-[8px] border border-border object-cover"
              />
            </div>

            {/* Left content */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                {href ? (
                  <Link target="_blank" href={href}>
                    <h3
                      title={college}
                      className="md:min-w-56 text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem] capitalize transition-colors hover:text-blue-500"
                    >
                      {truncateText(college, isMobile ? 15 : 22)}
                    </h3>
                  </Link>
                ) : (
                  <h3
                    title={college}
                    className="md:min-w-56 text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem]"
                  >
                    {truncateText(college, isMobile ? 15 : 22)}
                  </h3>
                )}

                {type && (
                  <span className="hidden md:inline-block rounded-[4px] border border-border px-1 py-0 text-[10px] font-medium text-muted-foreground">
                    {type}
                  </span>
                )}
              </div>

              <p className="text-[10px] text-muted-foreground sm:text-sm">
                {degree}
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
          </div>
        </div>

        {/* dashed separator */}
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
