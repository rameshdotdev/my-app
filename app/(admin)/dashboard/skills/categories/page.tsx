"use client";

import { useEffect, useState } from "react";
import { SkillCategory } from "@/types/type";

import { Button } from "@/components/ui/button";
import CategoryEditor from "./category-editor";
import CategoryPreview from "./category-preview";
import { useAppSelector } from "@/hooks/hooks";
import { createCategory, updateCategory } from "@/lib/api/skill";

export default function SkillCategoryPage() {
  const skillCategories = useAppSelector((state) => state.skillCategory);

  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [draft, setDraft] = useState<SkillCategory[]>([]);

  // Sync redux → local editable state
  useEffect(() => {
    setCategories(skillCategories);
    setDraft(skillCategories);
  }, [skillCategories]);

  const isDirty = JSON.stringify(categories) !== JSON.stringify(draft);

  const saveAll = async () => {
    await Promise.all(draft.map((c) => updateCategory(c._id, c)));
    setCategories(draft);
  };

  return (
    <div className="space-y-6 px-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Skill Categories</h1>

        <Button
          onClick={() =>
            createCategory({
              title: "PROGRAMMING",
              subTitle: "$ ls ./languages/",
              order: draft.length + 1,
            }).then(() => location.reload())
          }
        >
          + Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryEditor categories={draft} onChange={setDraft} />
        <CategoryPreview categories={draft.filter((c) => c.isVisible)} />
      </div>

      {isDirty && (
        <div className="sticky bottom-0 bg-background border-t p-4 flex justify-end">
          <Button onClick={saveAll}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}
