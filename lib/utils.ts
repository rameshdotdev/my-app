import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BLUR_FADE_DELAY = 0.04;

export const SOUND_FILES = {
  whoosh: "/sounds/woosh.mp3",
  glitch: "/sounds/glitch.wav",
} as const;

export type SoundType = keyof typeof SOUND_FILES;
