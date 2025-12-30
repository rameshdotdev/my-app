"use client";

import { SkillCategory } from "@/types/type";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";

export default function SkillBoardEditor({
  categories,
  onChange,
}: {
  categories: SkillCategory[];
  onChange: (v: SkillCategory[]) => void;
}) {
  const updateSkill = (catId: string, skillId: string, patch: any) => {
    onChange(
      categories.map((cat) =>
        cat._id !== catId
          ? cat
          : {
              ...cat,
              skills: cat.skills.map((s) =>
                s._id === skillId ? { ...s, ...patch } : s
              ),
            }
      )
    );
  };

  const removeSkill = (catId: string, skillId: string) => {
    onChange(
      categories.map((cat) =>
        cat._id !== catId
          ? cat
          : {
              ...cat,
              skills: cat.skills.filter((s) => s._id !== skillId),
            }
      )
    );
  };

  const addSkill = (catId: string) => {
    onChange(
      categories.map((cat) =>
        cat._id !== catId
          ? cat
          : {
              ...cat,
              skills: [
                ...cat.skills,
                {
                  _id: crypto.randomUUID(),
                  categoryId: catId,
                  name: "New Skill",
                  iconKey: "FaReact",
                  order: cat.skills.length,
                  isVisible: true,
                },
              ],
            }
      )
    );
  };

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat._id} className="border rounded-xl p-4 space-y-3">
          {/* Category Header */}
          <div>
            <h3 className="font-semibold">{cat.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {cat.subTitle}
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <Badge
                key={skill._id}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(cat._id, skill._id, {
                      name: e.target.value,
                    })
                  }
                  className="h-6 w-24 text-xs"
                />

                <Switch
                  checked={skill.isVisible}
                  onCheckedChange={(v) =>
                    updateSkill(cat._id, skill._id, {
                      isVisible: v,
                    })
                  }
                />

                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill(cat._id, skill._id)}
                />
              </Badge>
            ))}

            <Button
              size="sm"
              variant="outline"
              onClick={() => addSkill(cat._id)}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Skill
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
