"use client";

import { Skill, SkillCategory } from "@/types/type";
import { skillIconMap } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

export default function SkillBoardPreview({
  categories,
  onEditSkill,
}: {
  categories: SkillCategory[];
  onEditSkill?: (skill: Skill) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl border bg-muted/40 p-6 space-y-8">
      {categories
        .filter((cat) => cat.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((category) => (
          <div
            key={category._id}
            className="rounded-2xl border border-border/50 bg-background p-6"
          >
            {/* ================= Header ================= */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary">
                {category.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {category.subTitle}
              </p>
            </div>

            {/* ================= Skills Grid ================= */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {category.skills
                .filter((skill) => skill.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((skill) => {
                  const Icon = skillIconMap[skill.iconKey];

                  return (
                    <div
                      key={skill._id}
                      onClick={() => onEditSkill?.(skill)}
                      className="cursor-pointer flex items-center gap-2 rounded-lg px-3 py-2 bg-muted hover:bg-primary/10 transition"
                    >
                      <span className="text-base text-primary">
                        {Icon ? <Icon /> : "🔧"}
                      </span>
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  );
                })}
            </div>

            {/* ================= Empty State ================= */}
            {category.skills.filter((s) => s.isVisible).length === 0 && (
              <p className="mt-3 text-sm text-muted-foreground italic">
                No visible skills in this category
              </p>
            )}
          </div>
        ))}

      {/* ================= Global Empty State ================= */}
      {categories.filter((c) => c.isVisible).length === 0 && (
        <div className="text-center text-muted-foreground text-sm">
          No skill categories are visible
        </div>
      )}
    </div>
  );
}
