import Link from "next/link";
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
  SiJusteat,
} from "react-icons/si";

const skills = [
  {
    label: "React",
    href: "https://www.google.com/search?q=React%20JS%20JavaScript%20library",
    icon: SiReact,
  },
  {
    label: "Next",
    href: "https://www.google.com/search?q=Next.js%20React%20framework",
    icon: SiNextdotjs,
  },
  {
    label: "Expo",
    href: "https://www.google.com/search?q=Expo%20React%20Native%20framework",
    icon: SiExpo,
  },
  {
    label: "Django",
    href: "https://www.google.com/search?q=Django%20Python%20web%20framework",
    icon: SiDjango,
  },
  {
    label: "Express",
    href: "https://www.google.com/search?q=Express.js%20Node.js%20framework",
    icon: SiExpress,
  },
  {
    label: "Node",
    href: "https://www.google.com/search?q=Node.js%20JavaScript%20runtime",
    icon: SiNodedotjs,
  },
  {
    label: "Bun",
    href: "https://www.google.com/search?q=Bun.js%20JavaScript%20runtime",
    icon: SiBun,
  },
  {
    label: "PostgreSQL",
    href: "https://www.google.com/search?q=PostgreSQL%20database",
    icon: SiPostgresql,
  },
  {
    label: "MongoDB",
    href: "https://www.google.com/search?q=MongoDB%20NoSQL%20database",
    icon: SiMongodb,
  },
  {
    label: "Redis",
    href: "https://www.google.com/search?q=Redis%20in-memory%20database",
    icon: SiRedis,
  },
  {
    label: "Prisma",
    href: "https://www.google.com/search?q=Prisma%20ORM%20database%20toolkit",
    icon: SiPrisma,
  },
  {
    label: "Zustand",
    href: "https://www.google.com/search?q=Zustand%20React%20state%20management",
    icon: SiJusteat,
  },
  {
    label: "Tanstack Query",
    href: "https://www.google.com/search?q=TanStack%20Query%20React%20Query",
    icon: SiReactquery,
  },
  {
    label: "Postman",
    href: "https://www.google.com/search?q=Postman%20API%20testing%20tool",
    icon: SiPostman,
  },
  {
    label: "Tailwind",
    href: "https://www.google.com/search?q=Tailwind%20CSS%20framework",
    icon: SiTailwindcss,
  },
  {
    label: "shadcn",
    href: "https://www.google.com/search?q=shadcn%2Fui%20React%20components",
    icon: SiShadcnui,
  },
  {
    label: "Motion",
    href: "https://www.google.com/search?q=Framer%20Motion%20React%20animation%20library",
    icon: SiFramer,
  },
  {
    label: "GSAP",
    href: "https://www.google.com/search?q=GSAP%20GreenSock%20animation%20library",
    icon: SiGreensock,
  },
  {
    label: "JavaScript",
    href: "https://www.google.com/search?q=JavaScript%20programming%20language",
    icon: SiJavascript,
  },
  {
    label: "TypeScript",
    href: "https://www.google.com/search?q=TypeScript%20programming%20language",
    icon: SiTypescript,
  },
  {
    label: "Java",
    href: "https://www.google.com/search?q=Java%20programming%20language",
    icon: DiJava,
  },
  {
    label: "Python",
    href: "https://www.google.com/search?q=Python%20programming%20language",
    icon: SiPython,
  },
  {
    label: "C/C++",
    href: "https://www.google.com/search?q=C%20and%20C%2B%2B%20programming%20language",
    icon: SiCplusplus,
  },
  {
    label: "SQL",
    href: "https://www.google.com/search?q=SQL%20database%20query%20language",
    icon: SiMysql,
  },
  {
    label: "Git",
    href: "https://www.google.com/search?q=Git%20version%20control",
    icon: SiGit,
  },
  {
    label: "GitHub",
    href: "https://www.google.com/search?q=GitHub%20code%20hosting%20platform",
    icon: SiGithub,
  },
  {
    label: "Figma",
    href: "https://www.google.com/search?q=Figma%20design%20tool",
    icon: SiFigma,
  },
  {
    label: "Docker",
    href: "https://www.google.com/search?q=Docker%20containerization%20platform",
    icon: SiDocker,
  },
  {
    label: "Linux",
    href: "https://www.google.com/search?q=Linux%20operating%20system",
    icon: SiLinux,
  },
];

export default function SkillsChips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <Link
            key={skill.label}
            href={skill.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-fit flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-2 py-1 text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-foreground select-none"
          >
            <Icon className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {skill.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
