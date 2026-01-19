"use client";

import { Skill, SkillCategory } from "@/types/type";
import { skillIconMap } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  categories: SkillCategory[];
  onEditSkill?: (skill: Skill) => void;
  onDeleteSkill?: (skill: Skill) => void;
}

export default function SkillBoardPreview({
  categories,
  onEditSkill,
  onDeleteSkill,
}: Props) {
  const visibleCategories = categories
    .filter((c) => c.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-[8px] border bg-muted/40 p-6">
      {visibleCategories.map((category) => (
        <div
          key={category._id}
          className="group rounded-2xl border bg-background p-6 transition hover:shadow-sm"
        >
          {/* ================= Category Header ================= */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                {category.title}
              </h3>
              {category.subTitle && (
                <p className="font-mono text-xs text-muted-foreground">
                  {category.subTitle}
                </p>
              )}
            </div>
          </div>

          {/* ================= Skills Grid ================= */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {category.skills
              .filter((s) => s.isVisible)
              .sort((a, b) => a.order - b.order)
              .map((skill) => {
                const Icon = skillIconMap[skill.iconKey];

                return (
                  <div
                    key={skill._id}
                    className={cn(
                      "group/skill relative flex items-center gap-2 rounded-lg",
                      "bg-muted px-3 py-2 transition hover:bg-primary/10",
                    )}
                  >
                    <span className="text-primary">
                      {Icon ? <Icon /> : "🔧"}
                    </span>
                    <span className="text-sm truncate">{skill.name}</span>

                    {/* Skill Actions */}
                    <div className="absolute right-1 top-0 flex gap-1 opacity-0 transition group-hover/skill:opacity-100">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEditSkill?.(skill)}
                      >
                        <Pencil className="size-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDeleteSkill?.(skill)}
                      >
                        <Trash2 className="size-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ================= Empty Skills ================= */}
          {category.skills.filter((s) => s.isVisible).length === 0 && (
            <p className="mt-3 text-sm italic text-muted-foreground">
              No visible skills in this category
            </p>
          )}
        </div>
      ))}

      {/* ================= Global Empty State ================= */}
      {visibleCategories.length === 0 && (
        <div className="col-span-full text-center text-sm text-muted-foreground">
          No skill categories are visible
        </div>
      )}
    </div>
  );
}
