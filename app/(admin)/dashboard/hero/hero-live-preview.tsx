"use client";

import { useMemo, useState } from "react";
import type { Hero, Speed } from "@/types/profile";
import { TypeAnimation } from "react-type-animation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

function SwitchIcon({ activeIndex }: { activeIndex: 0 | 1 }) {
  if (activeIndex === 0) {
    return <RotateCcw className="h-3 w-3 rotate-120" />;
  }

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path>
    </svg>
  );
}

function CharacterCard({
  c,
  speed,
}: {
  c: Hero["characters"][number];
  speed: Speed;
}) {
  const [paused, setPaused] = useState(false);

  const typingSequence = useMemo(() => {
    if (!Array.isArray(c.titles) || c.titles.length === 0) return [];
    return c.titles
      .filter((t) => typeof t === "string" && t.trim().length > 0)
      .flatMap((t) => [t, 2000]);
  }, [c.titles]);

  return (
    <Card
      className="group overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-12 w-12 overflow-hidden rounded-full border bg-muted">
              {c.avatar?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.avatar.url}
                  alt={c.name}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            {/* Name */}
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Hello, I am</p>

              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{c.name}</h3>

                {c.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MdVerified size={16} />
                    Verified
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <Badge variant="secondary" className="rounded-full">
            Character
          </Badge>
        </div>

        <Separator />

        {/* Titles */}
        <div className="min-h-6">
          {typingSequence.length > 0 ? (
            paused ? (
              <span className="text-sm font-medium text-muted-foreground">
                {c.titles?.[0] || "—"}
              </span>
            ) : (
              <TypeAnimation
                sequence={typingSequence}
                speed={speed}
                repeat={Infinity}
                className="text-sm font-medium text-muted-foreground"
              />
            )
          ) : (
            <span className="text-sm font-medium text-muted-foreground">—</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {c.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="opacity-80 group-hover:opacity-100 transition">
            Hover to pause typing
          </span>
          <span className="tabular-nums opacity-70">Preview</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HeroLivePreview({
  hero,
  speed,
}: {
  hero: Hero;
  speed: Speed;
}) {
  const c1 = hero.characters?.[0];
  const c2 = hero.characters?.[1];

  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);

  const activeCharacter = activeIndex === 0 ? c1 : c2;

  const handleSwitch = () => {
    setActiveIndex((p) => (p === 0 ? 1 : 0));
  };

  if (!c1 && !c2) return null;

  return (
    <div className="rounded-2xl border bg-muted/40 p-6 md:p-8">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Live Preview</h2>
          <p className="text-xs text-muted-foreground">
            Mobile shows one character at a time. Desktop shows both.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            2 Characters
          </Badge>

          {/* Switch Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSwitch}
            className="h-8 w-8 rounded-full"
            title="Switch character"
            aria-label="Switch character"
          >
            <span className="text-muted-foreground transition-colors hover:text-foreground">
              <SwitchIcon activeIndex={activeIndex} />
            </span>
          </Button>
        </div>
      </div>

      {/* Desktop (both) */}
      <div className="hidden md:grid gap-5 md:grid-cols-2">
        {c1 ? <CharacterCard c={c1} speed={speed} /> : null}
        {c2 ? <CharacterCard c={c2} speed={speed} /> : null}
      </div>

      {/* Mobile (toggle one) */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {activeCharacter ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18 }}
            >
              <CharacterCard c={activeCharacter} speed={speed} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Small mobile hint */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing:{" "}
            <span className="font-medium">Character {activeIndex + 1}</span>
          </span>

          <button
            type="button"
            onClick={handleSwitch}
            className="underline underline-offset-4"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
}
