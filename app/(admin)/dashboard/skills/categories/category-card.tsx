"use client";

import { SkillCategory } from "@/types/type";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  category: SkillCategory;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (v: boolean) => void;
}

export function CategoryCard({ category, onEdit, onDelete, onToggle }: Props) {
  return (
    <div className="rounded-xl border bg-background p-5 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-primary">
            <span>{category.order}</span>. {category.title}
          </h3>
          <p className="font-mono text-xs text-muted-foreground">
            {category.subTitle}
          </p>
        </div>

        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="size-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-muted-foreground">Visible</span>
        <Switch checked={category.isVisible} onCheckedChange={onToggle} />
      </div>
    </div>
  );
}
