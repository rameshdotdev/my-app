"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { DiJava } from "react-icons/di";
import {
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiDjango,
  SiExpress,
  SiNodedotjs,
  SiBun,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiReactquery,
  SiPostman,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiGreensock,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiLinux,
  SiSocketdotio,
  SiWebrtc,
} from "react-icons/si";
import { Code2 } from "lucide-react";

/* ----------------------------- NORMALIZER ----------------------------- */
// makes: "Next Js" -> "nextjs", "Socket.io" -> "socketio"
function normalizeLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\./g, "") // remove dots
    .replace(/\s+/g, "") // remove spaces
    .replace(/-/g, ""); // remove dashes
}

/* ----------------------------- ICON MAPPING ----------------------------- */
// Use normalized keys ONLY
const ICONS: Record<string, IconType> = {
  react: SiReact,

  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs as any, // not needed but ok

  expo: SiExpo,
  django: SiDjango,
  express: SiExpress,

  node: SiNodedotjs,
  nodejs: SiNodedotjs,

  bun: SiBun,

  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  prisma: SiPrisma,

  zustand: SiReactquery,
  tanstackquery: SiReactquery,
  reactquery: SiReactquery,

  postman: SiPostman,

  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,

  shadcn: SiShadcnui,
  shadcnui: SiShadcnui,

  motion: SiFramer,
  framermotion: SiFramer,

  gsap: SiGreensock,

  javascript: SiJavascript,
  typescript: SiTypescript,
  java: DiJava,
  python: SiPython,

  cc: SiCplusplus,
  cpp: SiCplusplus,
  "c/c++": SiCplusplus as any,

  sql: SiMysql,

  git: SiGit,
  github: SiGithub,

  figma: SiFigma,
  docker: SiDocker,
  linux: SiLinux,

  socketio: SiSocketdotio,
  webrtc: SiWebrtc,
};

function getIconByLabel(label: string) {
  const key = normalizeLabel(label);
  return ICONS[key];
}

/* ------------------------------ HREF MAKER ------------------------------ */
function makeGoogleHref(label: string) {
  const query = encodeURIComponent(`${label} official`);
  return `https://www.google.com/search?q=${query}`;
}

/* ------------------------------- TECH CHIP ------------------------------ */
type TechChipProps = {
  label: string;
  href?: string; // optional override
  className?: string;
};

export function TechChip({ label, href, className }: TechChipProps) {
  const Icon = getIconByLabel(label);
  const finalHref = href ?? makeGoogleHref(label);

  return (
    <Link
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex min-w-fit flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent p-2",
        "text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-foreground select-none",
        className,
      )}
    >
      {Icon && (
        <Icon className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
      )}

      <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </Link>
  );
}

/* -------------------------- STACK CHIPS COMPONENT ------------------------ */
type ProjectTeckStackChipsProps = {
  stack: string[];
  title?: string;
  className?: string;
};

export default function ProjectTeckStackChips({
  stack,
  title = "Stack used",
  className,
}: ProjectTeckStackChipsProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2.5 px-4 pt-4 pb-5 font-semibold text-title",
        className,
      )}
    >
      <h1>{title}</h1>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {stack.map((label) => (
          <TechChip key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
