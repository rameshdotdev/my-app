"use client";
import { skillIconMap } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/hooks";
import { getSkills } from "@/store/features/skillSlice";

export default function SkillBoardPreview() {
  const skillsData = useAppSelector(getSkills);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {skillsData.map((category) => (
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
                      "bg-muted px-3 py-2 transition hover:bg-primary/10"
                    )}
                  >
                    <span className="text-primary">
                      {Icon ? <Icon /> : "🔧"}
                    </span>
                    <span className="text-sm truncate">{skill.name}</span>
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
      {skillsData.length === 0 && (
        <div className="col-span-full text-center text-sm text-muted-foreground">
          No skill categories are visible
        </div>
      )}
    </div>
  );
}
