import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Circle } from "lucide-react";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import Pin from "./pin";
import { StatusDot } from "./status-dot";

const PROJECTS = [
  {
    href: "/projects/lunel",
    title: "Lunel",
    subtitle: "Coming Soon",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, itaque.",
    bgImage: "/projects/bg1.avif",
    previewImage: "/soon.webp",
    status: "Building",
    statusColor: "destructive",
    pinned: true,
    showMobileSeparator: true,
  },
  {
    href: "/projects/asap",
    title: "Asap",
    subtitle: "Coming Soon",
    description:
      "Record studio-quality remote audio and video, locally captured without quality loss.",
    bgImage: "/projects/bg2.jpg",
    previewImage: "/soon.webp",
    status: "Building",
    statusColor: "destructive",
    pinned: false,
    showMobileSeparator: true,
  },
  {
    href: "/projects/cuez",
    title: "Cuez",
    subtitle: "Home Feed",
    description:
      "A social platform where developers share projects, ideas, and grow together.",
    bgImage: "/projects/bg3.avif",
    previewImage: "/projects/cuez.webp",
    status: "Live",
    statusColor: "emerald",
    pinned: false,
    showMobileSeparator: true,
  },
  {
    href: "/projects/daily-crimes",
    title: "The Daily Crimes",
    subtitle: "News Screen",
    description:
      "A crime news website presenting cases through a clean, newspaper-style interface.",
    bgImage: "/projects/bg4.png",
    previewImage: "/projects/daily-crimes.webp",
    status: "Live",
    statusColor: "emerald",
    pinned: false,
    showMobileSeparator: false,
  },
] as const;

export default function ProjectsGrid() {
  return (
    <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-2">
      {/* Middle dashed horizontal line (desktop) */}
      <div className="absolute left-0 top-1/2 z-0 hidden w-full -translate-y-1/2 md:block">
        <HorizontalDashedBorder />
      </div>

      {/* Middle dashed vertical line (desktop) */}
      <div className="absolute inset-y-0 hidden sm:left-1/2 -translate-x-1/2 sm:block">
        <VerticalDashedBorder />
      </div>

      {PROJECTS.map((project, idx) => {
        const isLive = project.status === "Live";

        return (
          <div key={idx}>
            <div className="relative z-10 p-3">
              <BlurFade delay={BLUR_FADE_DELAY * (idx + 1)}>
                <Link
                  href={project.href}
                  className="group flex w-full cursor-pointer flex-col gap-2"
                >
                  <div className="rounded-[12px] border border-border p-[4px]">
                    <div className="relative h-[200px] w-full overflow-hidden rounded-[8px] border border-border bg-muted/40 select-none sm:h-[170px] md:h-[200px]">
                      {/* Hover BG */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          backgroundImage: `url(${project.bgImage})`,
                        }}
                      />

                      {/* Subtitle */}
                      <h1 className="absolute left-2 top-2 text-xs font-medium text-muted-foreground transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:text-foreground">
                        {project.subtitle}
                      </h1>

                      {/* Preview */}
                      <div className="absolute bottom-0 left-1/2 h-[75%] w-[80%] -translate-x-1/2 rounded-t-[6px] bg-background p-[2px] pb-0 transition-all duration-300 group-hover:h-[70%]">
                        <div className="h-full w-full overflow-hidden rounded-t-[4px]">
                          <div className="hidden dark:block">
                            <Image
                              src={project.previewImage}
                              alt="Dark Screenshot"
                              width={1000}
                              height={1000}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="block dark:hidden">
                            <Image
                              src={project.previewImage}
                              alt="Light Screenshot"
                              width={1000}
                              height={1000}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Pin icon */}
                      {project.pinned && <Pin />}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[1.10rem] font-bold leading-[1.10] text-foreground">
                        {project.title}
                      </h3>
                      {project.status.toLocaleLowerCase() === "live" ? (
                        <StatusDot status="live" hotspot />
                      ) : (
                        <StatusDot status="building" hotspot />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-1 select-none">
                      <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        View Project
                      </p>
                      <ArrowUpRight className="h-[14px] w-[14px] text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                    </div>
                  </div>
                </Link>
              </BlurFade>
            </div>
            {/* dashed separator (mobile only) */}
            {project.showMobileSeparator && (
              <div className="block md:hidden">
                <HorizontalDashedBorder />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
