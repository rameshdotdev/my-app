"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, Mail } from "lucide-react";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const EmailButton = ({ href, children, className }: EmailButtonProps) => {
  return (
    <Button
      variant="outline"
      asChild
      className="w-full sm:w-auto
                rounded-[8px]
                border-2
                border-primary/30
                bg-background/50
                hover:bg-primary/5
                hover:border-primary/50
                text-primary
                hover:text-primary/90
                transition-all duration-300
                group/hire"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // className={cn(
        //   "w-fit flex items-center gap-1.5 px-2.5 py-1.75 sm:py-1.5",
        //   "bg-mutedBackground hover:bg-mutedBackgroundHover transition-colors duration-300",
        //   "text-sm text-foreground font-medium border cursor-pointer rounded-[9px]",
        //   "border-border group overflow-hidden select-none",
        //   className
        // )}
      >
        {/* Email icon with animation */}
        <Mail
          className="
                        h-4 w-4
                        group-hover/hire:scale-110
                        transition-transform duration-300
                      "
        />

        <span>{children}</span>
        <ChevronDown
          className="
                        h-4 w-4
                        opacity-0 -translate-y-2
                        group-hover/hire:opacity-100 group-hover/hire:translate-y-0
                        transition-all duration-300
                      "
        />
      </Link>
    </Button>
  );
};

export default EmailButton;
