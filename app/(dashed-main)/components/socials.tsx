"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getContactData } from "@/store/features/contactSlice";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Socials() {
  const contact = useAppSelector(getContactData);

  if (!contact?.social) return null;

  const socials = Object.entries(contact.social)
    .filter(([_, social]) => social?.url && social?.icon)
    .map(([name, social]) => ({
      name,
      url: social.url,
      iconKey: social.icon as keyof typeof Icons,
    }));

  const isHiddenOnMobile = (name: string) => {
    const key = name.toLowerCase();
    return key === "medium" || key === "leetcode";
  };

  const visibleSocials = socials.filter((s) => !isHiddenOnMobile(s.name));
  const hiddenSocials = socials.filter((s) => isHiddenOnMobile(s.name));

  return (
    <section id="socials">
      <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
        <div className="flex flex-col gap-2 pt-4">
          <h1 className="text-sm text-muted-foreground">
            Here are my{" "}
            <span className="font-medium text-foreground">socials</span>
          </h1>

          <div className="flex flex-wrap items-center gap-[7px]">
            {/* Visible chips */}
            {visibleSocials.map((item, idx) => {
              const Icon = Icons[item.iconKey];
              if (!Icon) return null;

              return (
                <div key={item.name} className="relative inline-block">
                  <BlurFade delay={BLUR_FADE_DELAY * 5 + idx * 0.05}>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={item.url}
                      className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                      <span className="ml-1.5 text-sm font-medium text-foreground capitalize">
                        {item.name}
                      </span>
                    </Link>
                  </BlurFade>
                </div>
              );
            })}

            {/* More dropdown (contains hidden socials) */}
            {hiddenSocials.length > 0 && (
              <div className="relative">
                <BlurFade
                  delay={BLUR_FADE_DELAY * 5 + visibleSocials.length * 0.05}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="group flex items-center rounded-md bg-muted px-2 py-1 transition-colors duration-200 hover:bg-muted/70 select-none"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                        <span className="ml-1.5 text-sm font-medium text-foreground">
                          More
                        </span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      className="min-w-[180px]"
                    >
                      {hiddenSocials.map((item) => {
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
              </div>
            )}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
