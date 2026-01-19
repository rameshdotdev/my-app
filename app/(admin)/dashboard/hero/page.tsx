"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Hero } from "@/types/profile";

import { Button } from "@/components/ui/button";
import HeroEditorPanel from "./hero-editor-panel";
import HeroLivePreview from "./hero-live-preview";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getHeroData, setHeroData } from "@/store/features/heroSlice";

import { fetchHero, updateHero } from "@/lib/api/hero";
import { toast } from "sonner";

export default function HeroComposerPage() {
  const hero = useAppSelector(getHeroData);
  const dispatch = useAppDispatch();

  const [draft, setDraft] = useState<Hero | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const savedSnapshotRef = useRef<Hero | null>(null);

  const isDirty = useMemo(() => {
    if (!draft || !savedSnapshotRef.current) return false;
    return JSON.stringify(draft) !== JSON.stringify(savedSnapshotRef.current);
  }, [draft]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchHero();
        if (!active) return;

        dispatch(setHeroData(res.data));
        setDraft(res.data);
        savedSnapshotRef.current = res.data;
      } catch (e: any) {
        if (!active) return;
        const msg = e?.message || "Failed to load hero";
        setError(msg);
        toast.error(msg);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!hero?.characters?.length) return;

    const saved = savedSnapshotRef.current;

    if (!draft || !saved) {
      setDraft(hero);
      savedSnapshotRef.current = hero;
      return;
    }

    const currentlyDirty = JSON.stringify(draft) !== JSON.stringify(saved);

    if (!currentlyDirty) {
      setDraft(hero);
      savedSnapshotRef.current = hero;
    }
  }, [hero, draft]);

  const handleSave = useCallback(async () => {
    if (!draft) return;

    const toastId = toast.loading("Saving hero...");

    try {
      setSaving(true);
      setError(null);

      await updateHero(draft);

      const res = await fetchHero();

      dispatch(setHeroData(res.data));
      setDraft(res.data);
      savedSnapshotRef.current = res.data;

      toast.success("Hero updated successfully!", { id: toastId });
    } catch (e: any) {
      const msg = e?.message || "Failed to save hero";
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setSaving(false);
    }
  }, [draft, dispatch]);

  const handleReset = useCallback(() => {
    if (savedSnapshotRef.current) {
      setDraft(savedSnapshotRef.current);
      toast.message("Changes reverted");
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isSaveCombo = isMac
        ? e.metaKey && key === "s"
        : e.ctrlKey && key === "s";

      if (!isSaveCombo) return;

      e.preventDefault();

      if (!saving && isDirty) {
        handleSave();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [saving, isDirty, handleSave]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground">
          Loading hero editor...
        </div>
      </div>
    );
  }

  if (error && !draft) {
    return (
      <div className="p-4">
        <div className="rounded-2xl border bg-muted/40 p-6 space-y-3">
          <p className="text-sm font-medium">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{error}</p>

          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!draft) return null;

  return (
    <div className="relative p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeroEditorPanel value={draft} onChange={setDraft} />
        <HeroLivePreview hero={draft} speed={50} />
      </div>

      <div
        className={[
          "sticky bottom-0 mt-6 rounded-2xl border bg-background/80 backdrop-blur",
          "px-4 sm:px-6 py-4 flex items-center justify-between gap-3",
          "transition-all",
          isDirty ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Unsaved changes</p>
          <p className="text-xs text-muted-foreground">
            Save to update your live hero content.{" "}
            <span className="font-medium">Ctrl + S</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleReset} disabled={saving}>
            Reset
          </Button>

          <Button onClick={handleSave} disabled={!isDirty || saving}>
            {saving ? "Saving..." : "Save Hero"}
          </Button>
        </div>
      </div>

      {error && draft ? (
        <div className="mt-3 rounded-[8px] border bg-muted/40 p-3 text-sm text-muted-foreground">
          {error}
        </div>
      ) : null}
    </div>
  );
}
