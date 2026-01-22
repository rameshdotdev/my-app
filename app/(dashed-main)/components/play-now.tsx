"use client";

import * as React from "react";
import { useSound } from "@/hooks/use-sound";

const sounds = [
  { type: "click", label: "Click" },
  { type: "hover", label: "Hover (mouseenter)" },
  { type: "success", label: "Success" },
  { type: "toggle", label: "Toggle" },
  { type: "pop", label: "Pop" },
  { type: "whoosh", label: "Whoosh" },
] as const;

type SoundType = (typeof sounds)[number]["type"];

export default function SoundTester() {
  const [enabled, setEnabled] = React.useState(true);
  const [volume, setVolume] = React.useState(0.5);

  const { play } = useSound({ enabled, volume });

  const playNow = (type: SoundType) => play(type);

  return (
    <div className="w-full max-w-xl rounded-2xl border bg-background p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Sound Tester</h2>
        <p className="text-sm text-muted-foreground">
          Try all Web Audio sounds (click / hover / success / toggle / pop /
          whoosh)
        </p>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Sound</p>
            <p className="text-xs text-muted-foreground">
              Enable / disable all sounds
            </p>
          </div>

          <button
            onClick={() => {
              setEnabled((prev) => !prev);
              playNow("toggle");
            }}
            className="inline-flex items-center rounded-xl border px-3 py-2 text-sm"
          >
            {enabled ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Volume</p>
            <p className="text-xs text-muted-foreground">
              {Math.round(volume * 100)}%
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-40"
            />
            <button
              onClick={() => {
                setVolume(0.5);
                playNow("pop");
              }}
              className="rounded-xl border px-3 py-2 text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sounds.map((s) => (
          <button
            key={s.type}
            onClick={() => playNow(s.type)}
            onMouseEnter={() => s.type === "hover" && playNow("hover")}
            className="group flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-left transition"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{s.label}</span>
              <span className="text-xs text-muted-foreground">{s.type}</span>
            </div>

            <span className="text-xs text-muted-foreground group-hover:text-foreground">
              Play
            </span>
          </button>
        ))}
      </div>

      {/* Quick tips */}
      <div className="mt-6 rounded-2xl border bg-muted/40 p-4">
        <p className="text-sm font-medium">Tip</p>
        <p className="mt-1 text-xs text-muted-foreground">
          If sound doesn’t play instantly, click once anywhere to unlock audio
          (browser autoplay restriction).
        </p>
      </div>
    </div>
  );
}
