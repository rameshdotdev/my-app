"use client";

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
                      className="relative text-[1.05rem] font-semibold leading-[0.90] text-foreground transition-colors sm:text-[1.20rem]
                      after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all
                      hover:text-foreground hover:after:w-full"
                    >
                      {college}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem]">
                    {college}
                  </h3>
                )}

                {type && (
                  <span className="rounded-[4px] border border-border px-1 py-0 text-xs font-medium text-muted-foreground">
                    {type}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground sm:text-sm">
                {degree}
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-medium text-foreground sm:text-sm">
                {duration}
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
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
