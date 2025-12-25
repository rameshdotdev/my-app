"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Skill } from "@/types/type";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { SkillFormModal } from "./skill-form-modal";
import { DeleteSkillDialog } from "./delete-skill-dialog";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Skill | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    const res = await api.get<Skill[]>("/skills");
    setSkills(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Button onClick={() => setOpenForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading skills...</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h2 className="text-lg font-semibold capitalize">
              {category.replace("_", " ")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((skill) => (
                <Card key={skill._id} className="p-4 flex justify-between">
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {skill.iconKey}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelected(skill);
                        setOpenForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        setSelected(skill);
                        setOpenDelete(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Modals */}
      <SkillFormModal
        open={openForm}
        skill={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
        }}
        onSuccess={fetchSkills}
      />

      <DeleteSkillDialog
        open={openDelete}
        skill={selected}
        onClose={() => setOpenDelete(false)}
        onSuccess={fetchSkills}
      />
    </div>
  );
}
