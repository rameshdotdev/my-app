"use client";

import { useEffect, useState } from "react";
import { SkillCategory, SkillCategoryTitle } from "@/types/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS: SkillCategoryTitle[] = [
  "PROGRAMMING",
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "AI_AND_DATA_SCIENCE",
  "TOOLS_AND_PLATFORMS",
];

interface Props {
  open: boolean;
  onClose: () => void;
  category?: SkillCategory | null;
  onSubmit: (data: Partial<SkillCategory>) => Promise<void>;
}

export function CategoryFormModal({
  open,
  onClose,
  category,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Partial<SkillCategory>>({
    title: "PROGRAMMING",
    subTitle: "",
    order: 0,
    isVisible: true,
  });

  useEffect(() => {
    if (category) setForm(category);
  }, [category]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ===== Category Title Select ===== */}
          <Select
            value={form.title as SkillCategoryTitle}
            onValueChange={(v: SkillCategoryTitle) =>
              setForm((p) => ({ ...p, title: v }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent className="w-full">
              {CATEGORY_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* ===== Subtitle ===== */}
          <Input
            placeholder="Subtitle"
            value={form.subTitle ?? ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, subTitle: e.target.value }))
            }
          />

          {/* ===== Order ===== */}
          <Input
            type="number"
            placeholder="Order"
            value={form.order ?? 0}
            onChange={(e) =>
              setForm((p) => ({ ...p, order: Number(e.target.value) }))
            }
          />

          {/* ===== Visibility ===== */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Visible on site
            </span>
            <Switch
              checked={form.isVisible}
              onCheckedChange={(v) => setForm((p) => ({ ...p, isVisible: v }))}
            />
          </div>

          <Button
            className="w-full"
            onClick={async () => {
              await onSubmit(form);
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
