"use client";
import CalendarButton from "@/components/calendar-button";
import EmailButton from "@/components/email-button";
import BlurFade from "@/components/magicui/blur-fade";
import { useAppSelector } from "@/hooks/hooks";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { getContactData } from "@/store/features/contactSlice";
import { getActiveCharacter } from "@/store/features/heroSlice";
import ReactMarkdown from "react-markdown";

function About() {
  const user = useAppSelector(getActiveCharacter);
  const contact = useAppSelector(getContactData);
  return (
    <>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="text-xs md:text-sm leading-relaxed text-muted-foreground [&>p]:mb-2 [&>p:last-child]:mb-0">
            <ReactMarkdown>{user.description}</ReactMarkdown>
          </div>
        </BlurFade>
      </div>
      <div>
        <div className="flex pt-4.5 gap-2 select-none">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <CalendarButton />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
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
