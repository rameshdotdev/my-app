"use client";

import * as React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getContactData } from "@/store/features/contactSlice";
import Link from "next/link";
import { Icons } from "@/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreIcon } from "./more-icon";
import SocialPreviewCard from "./social-preview-card";
import { FileText } from "lucide-react";

type PreviewType =
  | "x"
  | "github"
  | "linkedin-default"
  | "medium"
  | "leetcode"
  | "youtube";

const CARD_SIZE: Record<PreviewType, { w: number; h: number }> = {
  x: { w: 360, h: 320 }, // approximate
  github: { w: 320, h: 220 },
  "linkedin-default": { w: 340, h: 220 },
  medium: { w: 340, h: 220 },
  leetcode: { w: 340, h: 260 },
  youtube: { w: 360, h: 280 },
};

export default function Socials() {
  const contact = useAppSelector(getContactData);

  const [hovered, setHovered] = React.useState<PreviewType | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  // ✅ disable hover preview on touch devices
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    setIsTouchDevice(touch);
  }, []);

  if (!contact?.social) return null;

  const socials = Object.entries(contact.social)
    .filter(([_, social]) => social?.url && social?.icon)
    .map(([_, social]) => ({
      name: social.name,
      url: social.url,
      iconKey: social.icon as keyof typeof Icons,
    }));

  // ✅ Priority order
  const priority = [
    "github",
    "twitter",
    "linkedin",
    "medium",
    "youtube",
    "leetcode",
  ];

  const sortedSocials = [...socials].sort((a, b) => {
    const aKey = a.name.toLowerCase();
    const bKey = b.name.toLowerCase();

    const aIndex = priority.indexOf(aKey);
    const bIndex = priority.indexOf(bKey);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return aKey.localeCompare(bKey);
  });

  const desktopVisible = sortedSocials.slice(0, 5);
  const desktopHidden = sortedSocials.slice(5);

  const mobileVisible = sortedSocials.slice(0, 3);
  const mobileHidden = sortedSocials.slice(3);

  const getPreviewType = (
    name: string,
    iconKey: string,
  ): PreviewType | null => {
    const key = name.toLowerCase();

    if (key === "twitter" || iconKey.toLowerCase() === "x") return "x";
    if (key === "github") return "github";
    if (key === "linkedin") return "linkedin-default";
    if (key === "medium") return "medium";
    if (key === "youtube") return "youtube";
    if (key === "leetcode") return "leetcode";

    return null;
  };

  const clampPosition = (
    clientX: number,
    clientY: number,
    type: PreviewType,
  ) => {
    const padding = 12;
    const offset = 18;

    const { w, h } = CARD_SIZE[type];

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = clientX + offset;
    let y = clientY + offset;

    // if overflow right -> move left
    if (x + w + padding > vw) {
      x = clientX - w - offset;
    }

    // if overflow bottom -> move up
    if (y + h + padding > vh) {
      y = clientY - h - offset;
    }

    // final clamp inside viewport
    x = Math.max(padding, Math.min(x, vw - w - padding));
    y = Math.max(padding, Math.min(y, vh - h - padding));

    return { x, y };
  };

  const handleMove = (e: React.MouseEvent) => {
    if (!hovered) return;
    if (isTouchDevice) return;

    const next = clampPosition(e.clientX, e.clientY, hovered);
    setPos(next);
  };

  const handleEnter = (name: string, iconKey: string, e: React.MouseEvent) => {
    if (isTouchDevice) return;

    const t = getPreviewType(name, iconKey);
    if (!t) return;

    setHovered(t);

    // set position immediately (no jump)
    const next = clampPosition(e.clientX, e.clientY, t);
    setPos(next);
  };

  const handleLeave = () => setHovered(null);

  return (
    <section id="socials">
      {/* Preview card */}
      {!isTouchDevice && hovered && (
        <SocialPreviewCard type={hovered} left={pos.x} top={pos.y} />
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex gap-2">
            <h1 className="text-sm text-muted-foreground">
              Here are my{" "}
              <span className="font-medium text-foreground">socials </span>
            </h1>
            <h1 className="relative text-sm text-muted-foreground">
              & for resume click{" "}
              <span>
                <Link
                  href="/resume"
                  className="font-medium text-foreground underline"
                >
                  here
                </Link>
              </span>
              <div
                id="pulsing-dot"
                className="absolute top-[53%] -translate-y-1/2 -right-2 size-1 bg-cyan-600 rounded-full animate-ping"
              />
            </h1>
          </div>

          <div>
            {/* ✅ Desktop */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              {desktopVisible.map((item, idx) => {
                const Icon = Icons[item.iconKey];
                if (!Icon) return null;

                return (
                  <BlurFade
                    key={item.name}
                    delay={BLUR_FADE_DELAY * 5 + idx * 0.05}
                  >
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={item.url}
                      onMouseEnter={(e) =>
                        handleEnter(item.name, item.iconKey, e)
                      }
                      onMouseLeave={handleLeave}
                      onMouseMove={handleMove}
                      className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                      <span className="ml-1.5 text-sm font-medium text-foreground capitalize">
                        {item.name}
                      </span>
                    </Link>
                  </BlurFade>
                );
              })}

              {desktopHidden.length > 0 && (
                <BlurFade
                  delay={BLUR_FADE_DELAY * 5 + desktopVisible.length * 0.05}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                        onMouseEnter={handleLeave}
                      >
                        <MoreIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                        <span className="ml-1.5 text-sm font-medium text-foreground">
                          More
                        </span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      className="min-w-[180px]"
                    >
                      {desktopHidden.map((item) => {
                        const Icon = Icons[item.iconKey];
                        if (!Icon) return null;

                        return (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="capitalize">{item.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BlurFade>
              )}
            </div>

            {/* ✅ Mobile */}
            <div className="flex flex-wrap items-center gap-2 md:hidden">
              {mobileVisible.map((item, idx) => {
                const Icon = Icons[item.iconKey];
                if (!Icon) return null;

                return (
                  <BlurFade
                    key={item.name}
                    delay={BLUR_FADE_DELAY * 5 + idx * 0.05}
                  >
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={item.url}
                      onMouseEnter={(e) =>
                        handleEnter(item.name, item.iconKey, e)
                      }
                      onMouseLeave={handleLeave}
                      onMouseMove={handleMove}
                      className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                      <span className="ml-1.5 text-sm font-medium text-foreground capitalize">
                        {item.name}
                      </span>
                    </Link>
                  </BlurFade>
                );
              })}

              {mobileHidden.length > 0 && (
                <BlurFade
                  delay={BLUR_FADE_DELAY * 5 + mobileVisible.length * 0.05}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                        onMouseEnter={handleLeave}
                      >
                        <MoreIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                        <span className="ml-1.5 text-sm font-medium text-foreground">
                          More
                        </span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      className="min-w-[180px]"
                    >
                      {mobileHidden.map((item) => {
                        const Icon = Icons[item.iconKey];
                        if (!Icon) return null;

                        return (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="capitalize">{item.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BlurFade>
              )}
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
