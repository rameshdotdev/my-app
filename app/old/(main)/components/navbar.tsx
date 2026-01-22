"use client";

import { useState } from "react";
import type { FC } from "react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getTheme } from "@/store/features/themeSlice";
import { useAppSelector } from "@/hooks/hooks";

const navItems = ["home", "skills", "projects", "contact"] as const;

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled, scrollDirection } = useScrollDirection();
  const theme = useAppSelector(getTheme).mode;
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-all duration-300",
        scrollDirection === "up" && isScrolled && "-translate-y-full",
        isScrolled && "backdrop-blur-md bg-background/70 border-b border-border"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[95%] lg:max-w-[80%] items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition"
        >
          RK
        </a>

        {/* Desktop Nav */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-10 px-8 py-3 ",
            `${
              !isScrolled &&
              "bg-background/60 backdrop-blur border-2 border-border rounded-full"
            }`
          )}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="
                relative text-sm font-medium text-muted-foreground
                transition-colors hover:text-foreground
                after:absolute after:-bottom-1 after:left-0
                after:h-0.5 after:w-0 after:bg-primary
                after:transition-all hover:after:w-full
              "
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://x.com/rameshdotin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Image
                width={16}
                height={16}
                src={theme === "dark" ? "/x-white.png" : "/x-black.png"}
                className="text-white"
                alt="X"
              />
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/rameshdotdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </Button>

          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/90 backdrop-blur">
          <div className="flex h-full flex-col items-center justify-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-semibold transition hover:text-primary"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            <div className="flex gap-4 pt-6">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://x.com/rameshdotin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/rameshdotdev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </Button>

              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-3xl"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
