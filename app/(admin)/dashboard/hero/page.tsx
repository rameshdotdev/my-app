"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@/types/type";

import { Button } from "@/components/ui/button";
import HeroEditorPanel from "./hero-editor-panel";
import HeroLivePreview from "./hero-live-preview";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getHeroData, setHeroData } from "@/store/features/heroSlice";

import { fetchHero, updateHero } from "@/lib/api/hero";

export default function HeroComposerPage() {
  /* ======================
     Redux State
  ====================== */
  const hero = useAppSelector(getHeroData);
  const dispatch = useAppDispatch();

  /* ======================
     Local Draft State
  ====================== */
  const [draft, setDraft] = useState<Hero | null>(null);
  const [saving, setSaving] = useState(false);

  /* ======================
     Sync Redux → Draft
     (runs once or when hero changes)
  ====================== */
  useEffect(() => {
    if (hero) {
      setDraft(hero);
    }
  }, [hero]);

  /* ======================
     Dirty Check
  ====================== */
  const isDirty = useMemo(() => {
    if (!hero || !draft) return false;
    return JSON.stringify(hero) !== JSON.stringify(draft);
  }, [hero, draft]);

  /* ======================
     Save Handler
  ====================== */
  const handleSave = async () => {
    if (!draft) return;

    try {
      setSaving(true);
      await updateHero(draft);

      // scoped refetch (same pattern as projects)
      const res = await fetchHero();
      dispatch(setHeroData(res.data));
    } finally {
      setSaving(false);
    }
  };

  if (!draft) return null;

  /* ======================
     Render
  ====================== */
  return (
    <div className="relative p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeroEditorPanel value={draft} onChange={setDraft} />
        <HeroLivePreview hero={draft} speed={50} />
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
