"use client";

import Image from "next/image";
import { Eye, RotateCcw } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getContactData } from "@/store/features/contactSlice";
import {
  getActiveCharacter,
  getActiveIndex,
  switchCharacter,
} from "@/store/features/heroSlice";
import { useEffect, useMemo, useState } from "react";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHireMe } from "./hire-me";
import { api } from "@/lib/axios";
import Verified from "./verified";
import ImagePreviewModal from "./image-preview-modal";
import OfflineStatusTooltip from "./offline-status-toolpit";

type Totals = {
  visitors: number;
  pageviews: number;
};

export function SwitchIconButton({
  activeIndex,
  onClick,
}: {
  activeIndex: 0 | 1;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer mt-0 md:mt-2"
      aria-label="Switch character"
      title="Switch character"
    >
      {activeIndex === 0 ? (
        <RotateCcw className="size-3 rotate-120 text-muted-foreground transition-all duration-300 group-hover:text-foreground" />
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-muted-foreground transition-all duration-300 group-hover:text-foreground"
          height="12"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path>
        </svg>
      )}
    </button>
  );
}

export default function Profile() {
  const dispatch = useAppDispatch();
  const activeIndex = useAppSelector(getActiveIndex);
  const user = useAppSelector(getActiveCharacter);
  const contact = useAppSelector(getContactData);
  const [counts, setCount] = useState<Totals>({
    pageviews: 0,
    visitors: 0,
  });

  const [previewOpen, setPreviewOpen] = useState(false);

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

  const getCount = async () => {
    const res = await api.get<Totals>("/visitor");
    setCount(res.data);
  };
  useEffect(() => {
    getCount();
  }, []);

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
          <SwitchIconButton
            activeIndex={activeIndex}
            onClick={() => dispatch(switchCharacter())}
          />

          <div className="-mb-3">
            <div>
              <h1 className="relative inline-block min-w-39.25 text-xl sm:text-[1.55rem] font-bold leading-[1.08] text-foreground">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <span data-text={user.name}>
                    <span className="flex items-center gap-0.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${activeIndex}-${user.name}`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="whitespace-nowrap inline-flex items-center gap-0.5 -pt-1"
                        >
                          {user.name}
                          {user.isVerified && (
                            <Verified className="text-blue-500" />
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </span>
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
          className="flex items-center gap-1.5 font-medium text-muted-foreground transition-all duration-300 hover:text-foreground select-none"
        >
          <Eye className="h-4 w-4" />
          <span className="tabular-nums text-xs sm:text-sm">
            {counts.pageviews}
          </span>
        </div>
      </div>

      {/* Floating Hire Me */}
      <FloatingHireMe email={contact.email} />
      {/* Preview Modal */}
      <ImagePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        src={user.avatar?.url || "/avatar.png"}
        alt={`${user.name} profile`}
      />
    </div>
  );
}
