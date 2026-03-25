"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getContactData } from "@/store/features/contactSlice";
import SlotCounter, { type SlotCounterRef } from "react-slot-counter";

import {
  getActiveCharacter,
  getActiveIndex,
  getHeroData,
  setHeroData,
  switchCharacter,
} from "@/store/features/heroSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHireMe } from "./hire-me";
import Verified from "./verified";
import ImagePreviewModal from "./image-preview-modal";
import OfflineStatusTooltip from "./offline-status-toolpit";
import SwitchProfile from "./switch-profile";
import {
  getVisitorCounts,
  setVisitorCounts,
  Visitors,
} from "@/store/features/visitorSlice";
import { useFetch } from "@/hooks/use-fetch";
import { Hero } from "@/types/profile";

export default function Profile() {
  const dispatch = useAppDispatch();
  const activeIndex = useAppSelector(getActiveIndex);
  const user = useAppSelector(getActiveCharacter);
  const contact = useAppSelector(getContactData);
  const counts = useAppSelector(getVisitorCounts);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data } = useFetch<Hero>("/hero", {
    revalidate: 120,
    tags: ["hero"],
  });
  const { data: visitorData } = useFetch<Visitors>("/visitor", {
    revalidate: 120,
    tags: ["visitor"],
  });
  const typingSequence = useMemo(() => {
    if (
      !user?.titles ||
      !Array.isArray(user.titles) ||
      user.titles.length === 0
    )
      return [];

    return user.titles
      .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
      .flatMap((t) => [t, 2000]);
  }, [user?.titles]);

  // ✅ Proper ref typing for SlotCounter
  const counterRef = useRef<SlotCounterRef | null>(null);

  useEffect(() => {
    counterRef.current?.startAnimation();
  }, [counts?.pageviews]);
  useEffect(() => {
    if (data) {
      dispatch(setHeroData(data));
    }
    if (visitorData) {
      dispatch(setVisitorCounts(visitorData));
    }
  }, [data, visitorData, dispatch]);

  if (!user) return null;

  return (
    <div className="relative flex items-stretch justify-between">
      {/* Left */}
      <div className="flex items-end gap-3">
        {/* Profile Image */}
        <div>
          <div
            onClick={() => setPreviewOpen(true)}
            className="relative rounded-[12px] border border-border p-1 cursor-pointer transition duration-300 hover:brightness-90"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={user.avatar?.url || activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                <Image
                  src={user.avatar?.url || "/avatar.png"}
                  alt="Profile"
                  width={110}
                  height={110}
                  draggable={false}
                  className="size-25 md:size-29 select-none rounded-[8px] object-cover object-top"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <OfflineStatusTooltip />
          </div>
        </div>

        {/* Name + Title */}
        <div className="flex h-full flex-col justify-between py-1 select-none">
          <SwitchProfile
            activeIndex={activeIndex}
            onClick={() => dispatch(switchCharacter())}
          />

          <div className="-mb-3">
            <div>
              <h1 className="relative inline-block min-w-39.25 text-xl sm:text-[1.55rem] font-bold leading-[1.08] text-foreground">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <span className="flex items-center gap-0.5">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${activeIndex}-${user.name}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="whitespace-nowrap inline-flex items-center gap-0.5"
                      >
                        {user.name}
                        {user.isVerified && (
                          <Verified className="text-blue-500" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </BlurFade>
              </h1>
            </div>

            <div className="relative inline-block">
              <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`title-${activeIndex}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="inline-block"
                  >
                    {typingSequence.length > 0 ? (
                      <TypeAnimation
                        sequence={typingSequence}
                        speed={50}
                        repeat={Infinity}
                        className="text-sm text-muted-foreground font-medium"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground font-medium">
                        —
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end justify-between">
        <ThemeToggle className="-mt-2 md:mt-0 -mr-2 cursor-pointer rounded-md border border-transparent p-1.5 text-muted-foreground transition-colors duration-300 hover:border-border hover:bg-muted/50 hover:text-foreground" />

        <div
          title="Visitor Count"
          className="-mb-1 md:-mb-0.9 flex items-center justify-center gap-1.5 font-medium text-muted-foreground transition-all duration-300 hover:text-foreground select-none"
        >
          <Eye className="h-4 w-4 mt-1" />

          {/* ✅ No extra wrapper span needed */}
          <SlotCounter
            ref={counterRef}
            value={counts.pageviews}
            duration={0.8}
            charClassName="text-xs sm:text-sm"
          />
        </div>
      </div>

      <FloatingHireMe email={contact.email} />

      <ImagePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        src={user.avatar?.url || "/avatar.png"}
        alt={`${user.name} profile`}
      />
    </div>
  );
}
