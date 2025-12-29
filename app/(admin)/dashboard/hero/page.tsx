"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import { Hero, Speed } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HeroEditorPanel from "./hero-editor-panel";
import HeroLivePreview from "./hero-live-preview";

export default function HeroComposerPage() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [draft, setDraft] = useState<Hero | null>(null);
  const [saving, setSaving] = useState(false);
  const [speed, setSpeed] = useState<Speed>(50);

  useEffect(() => {
    api.get("/hero").then((res) => {
      setHero(res.data);
      setDraft(res.data);
    });
  }, []);

  const isDirty = useMemo(() => {
    return JSON.stringify(hero) !== JSON.stringify(draft);
  }, [hero, draft]);

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    await api.put("/hero", draft);
    setHero(draft);
    setSaving(false);
  };

  if (!draft) return null;

  return (
    <div className="relative p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeroEditorPanel value={draft} onChange={setDraft} />
        <HeroLivePreview hero={draft} speed={speed} />
      </div>

      {/* Sticky Save Bar */}
      {isDirty && (
        <div className="sticky bottom-0 mt-6 border-t bg-background px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Unsaved changes</span>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setDraft(hero)}>
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Hero"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
