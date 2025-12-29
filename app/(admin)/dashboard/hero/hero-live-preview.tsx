"use client";

import { useState } from "react";
import { Hero, Speed } from "@/types/type";
import { TypeAnimation } from "react-type-animation";

export default function HeroLivePreview({
  hero,
  speed,
}: {
  hero: Hero;
  speed: Speed;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="rounded-xl border bg-muted/40 p-8 flex items-center justify-center">
      <div
        className="text-center space-y-4 max-w-md"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Name */}
        <h1 className="text-4xl font-bold">
          Hi, I am <span className="text-primary">{hero.name}</span>
        </h1>

        {!paused && hero.titles.length > 0 && (
          <TypeAnimation
            sequence={hero.titles.flatMap((t) => [t, 2000])}
            speed={speed}
            repeat={Infinity}
            className="block italic text-muted-foreground min-h-7"
          />
        )}

        {paused && (
          <span className="block italic text-muted-foreground min-h-7">
            {hero.titles[0]}
          </span>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground">{hero.description}</p>

        {/* Resume */}
        {hero.resumeUrl && (
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4"
          >
            <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground">
              Download CV
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
