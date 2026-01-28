"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type SocialCTAProps = {
  labelDesktop: string;
  labelMobile: string;
  text: string;
  href: string;
};

export function SocialCTA({
  labelDesktop,
  labelMobile,
  text,
  href,
}: SocialCTAProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 justify-center">
      <p className="text-foreground flex items-center gap-1">
        <span className="hidden sm:block">{labelDesktop}</span>
        <span className="block sm:hidden">{labelMobile}</span>

        {/* 🔥 Motion parent controls everything */}
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center font-medium text-strong select-none"
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileFocus="hover"
        >
          {/* Text + underline */}
          <span className="relative">
            {text}

            <motion.span
              className="absolute left-0 bottom-0 w-full h-px bg-title"
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </span>

          {/* Arrow icon */}
          <motion.span
            className="ml-0.5 flex items-center"
            variants={{
              rest: { rotate: 0, x: 0, opacity: 0 },
              hover: { rotate: 45, x: 2, opacity: 1 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </motion.a>
      </p>
    </div>
  );
}
