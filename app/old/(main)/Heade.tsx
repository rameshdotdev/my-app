import { Dock, DockIcon } from "@/components/magicui/dock";
// import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { HomeIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      {/* background blur */}
      <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />

      <Dock
        className="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full items-center bg-background px-1 transform-gpu
        [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
        dark:border dark:border-white/10 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      >
        {/* Home */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <HomeIcon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
        </DockIcon>

        <Separator orientation="vertical" className="h-full" />

        {/* GitHub */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://github.com/samiksha0shukla"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <Icons.github className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>
        </DockIcon>

        {/* LinkedIn */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.linkedin.com/in/samiksha-shukla-7b2207217/"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <Icons.linkedin className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>
        </DockIcon>

        {/* X / Twitter */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://x.com/Samiksha2908"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <Icons.x className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>X</TooltipContent>
          </Tooltip>
        </DockIcon>

        <Separator orientation="vertical" className="h-full py-2" />

        {/* Theme toggle */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeToggle />
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
