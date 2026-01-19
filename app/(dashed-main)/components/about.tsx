"use client";
import CalendarButton from "@/components/calendar-button";
import EmailButton from "@/components/email-button";
import BlurFade from "@/components/magicui/blur-fade";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getContactData } from "@/store/features/contactSlice";
import { getHeroData } from "@/store/features/heroSlice";

function About() {
  const user = useAppSelector(getHeroData);
  const contact = useAppSelector(getContactData);
  return (
    <>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        <p>
          Hey, I&apos;m Rinkit, a full stack developer who loves building clean,
          modern websites and apps where design, functionality, and even the
          smallest details matter, with a focus on making products that are both
          practical and visually satisfying.
        </p>

        <p>
          Tech stack isn&apos;t my concern, I&apos;m flexible with whatever the
          project needs, though I prefer modern frameworks and tools. I&apos;m
          always open for new opportunities to learn and grow.
        </p>
      </div>
      <div>
        <div className="flex pt-4.5 gap-2 select-none">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <CalendarButton />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <EmailButton href={`mailto:${contact.email}`}>
              Send an email
            </EmailButton>
          </BlurFade>
        </div>
      </div>
    </>
  );
}

export default About;
