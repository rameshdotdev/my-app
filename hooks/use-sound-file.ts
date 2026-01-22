"use client";

import { SoundType } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";

type SoundMap = Partial<Record<SoundType, string>>;

type Options = {
  volume?: number;
  enabled?: boolean;
  sounds?: SoundMap;
};

export function useSoundFile({
  sounds = {},
  volume = 0.6,
  enabled = true,
}: Options) {
  const audiosRef = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    Object.values(audiosRef.current).forEach((a) => {
      if (!a) return;
      a.pause();
      a.currentTime = 0;
    });

    audiosRef.current = {};

    const entries = Object.entries(sounds) as [SoundType, string][];
    for (const [type, src] of entries) {
      if (!src) continue;

      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume;

      audiosRef.current[type] = audio;
    }

    return () => {
      Object.values(audiosRef.current).forEach((a) => {
        if (!a) return;
        a.pause();
        a.currentTime = 0;
      });
      audiosRef.current = {};
    };
  }, [sounds, volume]);

  const play = useCallback(
    async (type: SoundType) => {
      if (!enabled) return;

      const audio = audiosRef.current[type];
      if (!audio) return;

      try {
        audio.currentTime = 0;
        await audio.play();
      } catch {
        // autoplay restriction
      }
    },
    [enabled],
  );

  return { play };
}
