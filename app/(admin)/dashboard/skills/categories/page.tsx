"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "./category-card";
import { CategoryFormModal } from "./category-form-modal";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "@/lib/api/skill";
import {
  getSkillCategories,
  setSkillCategories,
} from "@/store/features/skillCategorySlice";
import { SkillCategory } from "@/types/type";

export default function SkillCategoryPage() {
  const categories = useAppSelector(getSkillCategories);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SkillCategory | null>(null);

  const refresh = async () => {
    const res = await fetchCategories();
    dispatch(setSkillCategories(res.data));
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skill Categories</h1>
        <Button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Add Category
        </Button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            onEdit={() => {
              setSelected(cat);
              setOpen(true);
            }}
            onDelete={async () => {
              if (!confirm(`Delete "${cat.title}"?`)) return;
              await deleteCategory(cat._id);
              await refresh();
            }}
            onToggle={async (v) => {
              await updateCategory(cat._id, { isVisible: v });
              await refresh();
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <CategoryFormModal
        open={open}
        category={selected}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        onSubmit={async (data) => {
          if (selected) {
            await updateCategory(selected._id, data);
          } else {
            await createCategory(data);
          }
          await refresh();
        }}
      />
    </div>
  );
}
