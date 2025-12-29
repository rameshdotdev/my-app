"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import { Skill } from "@/types/type";
import { Button } from "@/components/ui/button";
import SkillEditorPanel from "./skill-editor-panel";
import SkillLivePreview from "./skill-live-preview";

export default function SkillBoardPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [draft, setDraft] = useState<Skill[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/skills").then((res) => {
      setSkills(res.data);
      setDraft(res.data);
    });
  }, []);

  const hasDuplicates = useMemo(() => {
    const names = draft.map((s) => s?.name?.trim()?.toLowerCase());
    return new Set(names).size !== names.length;
  }, [draft]);

  const isDirty = JSON.stringify(skills) !== JSON.stringify(draft);

  const handleSave = async () => {
    setSaving(true);
    await api.post("/skills", draft);
    setSkills(draft);
    setSaving(false);
  };

  return (
    <div className="relative space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillEditorPanel skills={draft} onChange={setDraft} />
        <SkillLivePreview skills={draft.filter((s) => s.isVisible)} />
      </div>

      {isDirty && (
        <div className="sticky bottom-0 border-t bg-background px-6 py-4 flex justify-between">
          <span className="text-sm text-muted-foreground">Unsaved changes</span>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setDraft(skills)}>
              Reset
            </Button>
            <Button disabled={saving || hasDuplicates} onClick={handleSave}>
              Save Skills
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
