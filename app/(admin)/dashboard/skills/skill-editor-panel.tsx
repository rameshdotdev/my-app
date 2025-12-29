import { Skill } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const CATEGORY_LABELS = {
  LANGUAGES: "Languages",
  FRAMEWORKS: "Frameworks",
  DEV_TOOLS: "Dev Tools",
};

export default function SkillEditorPanel({
  skills,
  onChange,
}: {
  skills: Skill[];
  onChange: (s: Skill[]) => void;
}) {
  const grouped = Object.keys(CATEGORY_LABELS).map((cat) => ({
    category: cat as Skill["category"],
    skills: skills.filter((s) => s.category === cat),
  }));

  const updateSkill = (id: string, patch: Partial<Skill>) =>
    onChange(skills.map((s) => (s._id === id ? { ...s, ...patch } : s)));

  const removeSkill = (id: string) =>
    onChange(skills.filter((s) => s._id !== id));

  return (
    <div className="space-y-6">
      {grouped.map(({ category, skills }) => (
        <div key={category} className="rounded-xl border p-4 space-y-3">
          <h3 className="font-semibold">{CATEGORY_LABELS[category]}</h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill._id}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill._id, { name: e.target.value })
                  }
                  className="h-6 w-24 text-xs"
                />
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill(skill._id)}
                />
              </Badge>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              onChange([
                ...skills,
                {
                  _id: crypto.randomUUID(),
                  name: "New Skill",
                  category,
                  iconKey: "FaReact",
                  order: skills.length,
                  isVisible: true,
                },
              ])
            }
          >
            + Add Skill
          </Button>
        </div>
      ))}
    </div>
  );
}
