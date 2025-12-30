"use client";

import { skillIconMap, SkillIconKey } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

export function IconPicker({
  value,
  suggestions,
  onChange,
}: {
  value: SkillIconKey;
  suggestions: string[];
  onChange: (key: SkillIconKey) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {suggestions.map((key) => {
        const Icon = skillIconMap[key as SkillIconKey];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key as SkillIconKey)}
            className={cn(
              "flex items-center justify-center rounded-lg border p-2",
              value === key ? "border-primary bg-primary/10" : "hover:bg-muted"
            )}
          >
            <Icon className="text-lg" />
          </button>
        );
      })}
    </div>
  );
}
