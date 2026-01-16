"use client";

import { useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";
import { getHeroData } from "@/store/features/heroSlice";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import Collaborate from "./collaborate";
import { motion } from "framer-motion";
import { Works } from "./works";
import { MdMeetingRoom } from "react-icons/md";
import { IconCalendar, IconCalendarDot } from "@tabler/icons-react";
import CalendarButton from "@/components/calendar-button";
import EmailButton from "@/components/email-button";
import { getContactData } from "@/store/features/contactSlice";
const Hero = () => {
  const hero = useAppSelector(getHeroData);
  const contact = useAppSelector(getContactData);
  /**
   * Stable typing sequence
   */
  const typingSequence = useMemo(() => {
    if (!Array.isArray(hero.titles) || hero.titles.length === 0) return [];

    return hero.titles
      .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
      .flatMap((t) => [t, 2000]);
  }, [hero.titles]);

  // 🔒 Guard
  if (!hero) return null;

  return (
    <section id="home">
      <div className="grid items-center md:gap-12 md:grid-cols-2">
        {/* ================= LEFT ================= */}
        <div className="gap-2 flex justify-between items-center">
          <div className="flex-col flex flex-1 space-y-1.5">
            <CardContent className="px-0 text-center md:text-left">
              {/* Greeting */}
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                yOffset={8}
                className="lg:mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
                text="Hello, I’m"
              />

              {/* Name */}
              <h1 className="lg:min-h-14 text-2xl font-extrabold sm:text-5xl lg:text-6xl">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY * 1.5}
                  yOffset={8}
                  className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
                  text={hero.name}
                />
              </h1>

              {/* Typing */}
              <div className="hidden md:flex items-center gap-2">
                {typingSequence.length > 0 && (
                  <Sparkles className="h-4 w-4 text-primary" />
                )}

                <div className="h-8 overflow-hidden">
                  {typingSequence.length > 0 && (
                    <TypeAnimation
                      sequence={typingSequence}
                      speed={50}
                      repeat={Infinity}
                      className="
                        text-lg sm:text-xl md:text-2xl
                        font-medium
                        bg-linear-to-r from-muted-foreground to-muted-foreground/80
                        bg-clip-text text-transparent
                        italic
                      "
                    />
                  )}
                </div>
              </div>
              {/* Description */}
              <BlurFade
                delay={BLUR_FADE_DELAY * 3}
                className="hidden md:inline-block pt-4 prose max-w-full text-pretty font-sans text-lg text-muted-foreground dark:prose-invert"
              >
                <Markdown>{hero.description}</Markdown>
              </BlurFade>

              {/* CTA Buttons for desktop screens */}
              <div className="hidden md:flex mt-8 flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <BlurFade
                  delay={BLUR_FADE_DELAY * 4}
                  className="flex-1 sm:flex-initial"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CalendarButton />
                  </motion.div>
                </BlurFade>

                <BlurFade
                  delay={BLUR_FADE_DELAY * 4.2}
                  className="flex-1 sm:flex-initial"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EmailButton href={`mailto:${contact.email}`}>
                      Send an email
                    </EmailButton>
                  </motion.div>
                </BlurFade>
              </div>
            </CardContent>
          </div>
          <div className="relative md:hidden h-32 w-32 lg:h-80 lg:w-80">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />

            <BlurFade
              delay={BLUR_FADE_DELAY * 4.6}
              className="relative h-full w-full overflow-hidden rounded-full bg-background ring-4 ring-border"
            >
              <Image
                src="/avatar.png"
                alt={hero.name}
                fill
                priority
                className="object-cover object-top"
              />
            </BlurFade>
          </div>
        </div>
        {/* Typing animation */}
        <div className="relative md:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="h-6 overflow-hidden">
              {typingSequence.length > 0 && (
                <TypeAnimation
                  sequence={typingSequence}
                  speed={50}
                  repeat={Infinity}
                  className="
                        text-lg sm:text-xl md:text-2xl
                        font-medium
                        bg-linear-to-r from-muted-foreground to-muted-foreground/80
                        bg-clip-text text-transparent
                        italic
                      "
                />
              )}
            </div>
          </div>
        </div>
        <section id="about" className="md:hidden pt-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade
            delay={BLUR_FADE_DELAY * 4}
            className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
          >
            <Markdown>{hero.description}</Markdown>
          </BlurFade>
          {/* CTA Btns for mobile screens */}
          <div className="flex md:hidden mt-8 gap-4 my-4">
            <BlurFade
              delay={BLUR_FADE_DELAY * 4}
              className="flex-1 sm:flex-initial"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarButton />
              </motion.div>
            </BlurFade>

            <BlurFade
              delay={BLUR_FADE_DELAY * 4.2}
              className="flex-1 sm:flex-initial"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EmailButton href={`mailto:${contact.email}`}>
                  Send an email
                </EmailButton>
              </motion.div>
            </BlurFade>
          </div>
        </section>
        {/* ================= RIGHT ================= */}
        <div className="hidden md:flex justify-end">
          <div className="relative h-72 w-72 lg:h-80 lg:w-80">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />

            <BlurFade
              delay={BLUR_FADE_DELAY * 4.6}
              className="relative h-full w-full overflow-hidden rounded-full bg-background ring-4 ring-border"
            >
              <Image
                src="/avatar.png"
                alt={hero.name}
                fill
                priority
                className="object-cover object-top"
              />
            </BlurFade>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Collaborate />
        <Works />
      </div>
    </section>
  );
};

export default Hero;
