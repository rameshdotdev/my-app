"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SkillBoardPreview from "./skill-board-preview";
import { SkillFormModal } from "./add-skill-form";

import { Skill, SkillCategory } from "@/types/type";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSkills, setSkills } from "@/store/features/skillSlice";

import {
  createSkill,
  fetchSkills,
  deleteSkill,
  updateSkill,
} from "@/lib/api/skill";

export default function SkillBoardPage() {
  /* ======================
       Redux State
  ====================== */
  const categories = useAppSelector(getSkills);
  const dispatch = useAppDispatch();

  /* ======================
       Local State
  ====================== */
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory | null>(null);

  /* ======================
       Helpers
  ====================== */
  const refreshSkills = async () => {
    const res = await fetchSkills();
    dispatch(setSkills(res.data));
  };

  /* ======================
       Handlers
  ====================== */
  const handleAddSkill = () => {
    setSelectedSkill(null);
    setOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const handleDeleteSkill = async (skill: Skill) => {
    if (!confirm(`Delete skill "${skill.name}"?`)) return;
    await deleteSkill(skill._id);
    await refreshSkills();
  };

  /* ======================
       Render
  ====================== */
  return (
    <div className="space-y-6 p-4">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Skill Board</h1>
        <Button onClick={handleAddSkill}>+ Add Skill</Button>
      </div>

      {/* ===== Skill Board ===== */}
      <SkillBoardPreview
        categories={categories}
        onEditSkill={handleEditSkill}
        onDeleteSkill={handleDeleteSkill}
      />

      {/* ===== Skill Modal ===== */}
      <SkillFormModal
        open={open}
        skill={selectedSkill}
        categories={categories}
        onClose={() => {
          setOpen(false);
          setSelectedSkill(null);
        }}
        onSubmit={async (data, isEdit) => {
          if (isEdit && selectedSkill) {
            await updateSkill(selectedSkill._id, data);
          } else {
            await createSkill(data);
          }
          await refreshSkills();
          setOpen(false);
          setSelectedSkill(null);
        }}
      />
    </div>
  );
}
