"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Hero as HeroType } from "@/types/type";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

const Hero = () => {
  const [hero, setHero] = useState<HeroType | null>(null);

  useEffect(() => {
    api.get<HeroType>("/hero").then((res) => setHero(res.data));
  }, []);

  if (!hero) return null;

  return (
    <section
      id="home"
      className="relative mt-24 mb-32 mx-auto max-w-[95%] lg:max-w-[80%]"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* LEFT: Glass Card */}
        <Card
          className="
            border-border/50
            bg-background/60
            backdrop-blur-xl
            shadow-lg
          "
        >
          <CardContent className="p-8 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Hello, I’m
            </p>

            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                {hero.name}
              </span>
            </h1>

            {/* Typing animation */}
            <div className="mt-6">
              <TypeAnimation
                sequence={hero.titles.flatMap((t) => [t, 2000])}
                speed={50}
                repeat={Infinity}
                className="
                  typing-cursor
                  text-lg sm:text-xl md:text-2xl
                  font-semibold italic
                  text-muted-foreground
                "
              />
            </div>

            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-muted-foreground">
              {hero.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild>
                <a href={hero.resumeUrl} target="_blank">
                  My Resume <Download />
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Hire Me</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Avatar */}
        <div className="hidden md:flex justify-end">
          <div className="relative h-72 w-72 lg:h-80 lg:w-80">
            {/* soft glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-border bg-background">
              <Image
                src="/avatar.png"
                alt={hero.name}
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
