"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { SkillCategory, Skill } from "@/types/type";
import { Button } from "@/components/ui/button";
import SkillBoardPreview from "./skill-board-preview";
import { SkillFormModal } from "./add-skill-form";

export default function SkillBoardPage() {
  const [data, setData] = useState<SkillCategory[]>([]);
  const [draft, setDraft] = useState<SkillCategory[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    api.get("/skills").then((res) => {
      setData(res.data);
      setDraft(res.data);
    });
  }, []);

  /* =========================
     ADD / UPDATE HANDLER
  ========================= */
  const handleSubmit = (payload: Partial<Skill>) => {
    setDraft((prev) =>
      prev.map((cat) => {
        // EDIT
        if (selectedSkill && cat._id === selectedSkill.categoryId) {
          return {
            ...cat,
            skills: cat.skills.map((s) =>
              s._id === selectedSkill._id ? { ...s, ...payload } : s
            ),
          };
        }

        // ADD
        if (!selectedSkill && cat._id === payload.categoryId) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              {
                _id: crypto.randomUUID(),
                categoryId: cat._id,
                name: payload.name!,
                iconKey: payload.iconKey!,
                order: cat.skills.length,
                isVisible: payload.isVisible ?? true,
              },
            ],
          };
        }

        return cat;
      })
    );

    setSelectedSkill(null);
    setOpen(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Skill Board</h1>
        <Button onClick={() => setOpen(true)}>+ Add Skill</Button>
      </div>

      {/* ===== Editor + Preview ===== */}
      <div className="">
        {/* Clickable Preview → Edit */}
        <SkillBoardPreview
          categories={draft}
          onEditSkill={(skill) => {
            setSelectedSkill(skill);
            setOpen(true);
          }}
        />
      </div>

      {/* ===== Modal ===== */}
      <SkillFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedSkill(null);
        }}
        categories={draft}
        skill={selectedSkill}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
