"use client";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Hero as HeroData } from "@/types/type";
/* ======================
   Component
====================== */
export const Hero: React.FC = () => {
  const [hero, setHero] = useState<HeroData | null>(null);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get<HeroData>("/hero");
        setHero(res.data);
      } catch (error) {
        console.error("Failed to load hero", error);
      }
    };
    fetchHero();
  }, []);
  if (!hero) return null;
  return (
    <section
      id="home"
      className="relative mt-20 mb-24 max-w-full overflow-x-hidden text-foreground md:mb-12"
    >
      {/* =====================
      Content
  ====================== */}
      <div className="container mx-auto flex max-w-[95%] flex-col items-center justify-center gap-2 py-5 md:flex-row lg:max-w-[80%]">
        <div className="space-y-6 text-center md:ml-3">
          {/* Name */}
          <span className="block text-5xl font-medium md:text-6xl">
            Hi, I am <span className="font-bold text-primary">{hero.name}</span>
          </span>

          {/* Titles */}
          <TypeAnimation
            sequence={hero.titles.flatMap((title) => [title, 2000])}
            speed={50}
            repeat={Infinity}
            className="block whitespace-nowrap text-xl font-semibold italic text-muted-foreground md:text-4xl"
          />

          {/* Description */}
          <p className="max-w-xl text-muted-foreground">{hero.description}</p>

          {/* CTA */}
          <div className="flex w-full justify-center">
            <Button asChild>
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
