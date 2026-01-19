"use client";

import { useMemo, useRef, useState } from "react";
import type { Hero, HeroCharacter } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload, Trash2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

const emptyCharacter: HeroCharacter = {
  name: "",
  avatar: { url: "", publicId: "" },
  titles: [""],
  description: "",
  isVerified: false,
};

const emptyHero: Hero = {
  _id: "",
  characters: [emptyCharacter, emptyCharacter],
};

function CharacterEditor({
  index,
  value,
  onChange,
}: {
  index: number;
  value: HeroCharacter;
  onChange: (v: HeroCharacter) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const update = (patch: Partial<HeroCharacter>) =>
    onChange({ ...value, ...patch });

  const safeTitles = useMemo(() => {
    const t = Array.isArray(value.titles) ? value.titles : [];
    return t.length ? t : [""];
  }, [value.titles]);

  const updateTitle = (i: number, title: string) => {
    const titles = [...safeTitles];
    titles[i] = title;
    update({ titles });
  };

  const removeTitle = (i: number) => {
    const next = safeTitles.filter((_, idx) => idx !== i);
    update({ titles: next.length ? next : [""] });
  };

  const addTitle = () => {
    update({ titles: [...safeTitles, ""] });
  };

  const handlePickFile = () => fileRef.current?.click();

  const handleImageChange = async (file: File) => {
    // instant preview
    const localPreview = URL.createObjectURL(file);
    update({
      avatar: {
        url: localPreview,
        publicId: value.avatar?.publicId || "",
      },
    });

    try {
      setUploading(true);
      const res = await uploadToCloudinary(file);

      update({
        avatar: {
          url: res.secure_url,
          publicId: res.public_id,
        },
      });
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = () => {
    update({
      avatar: { url: "", publicId: "" },
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">
              🎭 Character {index + 1}
            </h2>
            <p className="text-xs text-muted-foreground">
              Edit avatar, name, verified status, titles & description.
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full">
            Editor
          </Badge>
        </div>

        <Separator />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="space-y-2">
          <Label>Avatar</Label>

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border bg-muted">
              {value.avatar?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value.avatar.url}
                  alt={`Avatar ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageChange(file);
                }}
              />

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePickFile}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeAvatar}
                  disabled={uploading || !value.avatar?.url}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Square image recommended. Cloudinary URL will be saved.
              </p>
            </div>
          </div>

          {value.avatar?.url ? (
            <Input value={value.avatar.url} readOnly />
          ) : null}
        </div>

        {/* Verified */}
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div className="space-y-1">
            <Label>Verified</Label>
            <p className="text-xs text-muted-foreground">
              Show verified badge for this character.
            </p>
          </div>

          <Switch
            checked={value.isVerified}
            onCheckedChange={(checked) => update({ isVerified: checked })}
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={value.name}
            placeholder="Enter name..."
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            rows={4}
            value={value.description}
            placeholder="Write something about this character..."
            onChange={(e) => update({ description: e.target.value })}
          />
        </div>

        {/* Titles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>Titles (Animation Order)</Label>
              <p className="text-xs text-muted-foreground">
                These titles will animate in the hero section.
              </p>
            </div>

            <Button type="button" variant="outline" size="sm" onClick={addTitle}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {safeTitles.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl border p-2"
              >
                <span className="text-xs text-muted-foreground w-5 text-center">
                  {i + 1}
                </span>

                <Input
                  value={t}
                  placeholder={`Title ${i + 1}`}
                  onChange={(e) => updateTitle(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTitle();
                    }
                  }}
                />

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeTitle(i)}
                  disabled={safeTitles.length === 1 && i === 0}
                  title="Remove title"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HeroEditorPanel({
  value,
  onChange,
}: {
  value: Hero | null | undefined;
  onChange: (v: Hero) => void;
}) {
  const safeHero = value?.characters?.length === 2 ? value : emptyHero;

  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);

  const updateCharacter = (idx: 0 | 1, patch: HeroCharacter) => {
    const characters = [...safeHero.characters] as Hero["characters"];
    characters[idx] = patch;
    onChange({ ...safeHero, characters });
  };

  return (
    <div className="space-y-4">
      {/* Top Switch */}
      <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={activeIndex === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIndex(0)}
            className="rounded-full"
          >
            Character 1
          </Button>

          <Button
            type="button"
            variant={activeIndex === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIndex(1)}
            className="rounded-full"
          >
            Character 2
          </Button>
        </div>

        <Badge variant="secondary" className="rounded-full">
          Editing
        </Badge>
      </div>

      {/* Active Editor */}
      {activeIndex === 0 ? (
        <CharacterEditor
          index={0}
          value={safeHero.characters[0]}
          onChange={(v) => updateCharacter(0, v)}
        />
      ) : (
        <CharacterEditor
          index={1}
          value={safeHero.characters[1]}
          onChange={(v) => updateCharacter(1, v)}
        />
      )}
    </div>
  );
}
