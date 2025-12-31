"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillCategory, Skill } from "@/types/type";
import { IconPicker } from "./icon-picker";
import { ICON_SUGGESTIONS } from "@/lib/skill-icon-suggestions";
import { ALL_ICONS, SkillIconKey } from "@/lib/skill-icons";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: SkillCategory[];
  skill?: Skill | null;
  onSubmit: (data: Partial<Skill>, isEdit: boolean) => void;
};

export function SkillFormModal({
  open,
  onClose,
  categories,
  skill,
  onSubmit,
}: Props) {
  const isEdit = Boolean(skill);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState<SkillIconKey>("FaReact");
  const [isVisible, setIsVisible] = useState(true);

  const category = categories.find((c) => c._id === categoryId);
  const icons = category
    ? ICON_SUGGESTIONS[category.title] ?? ALL_ICONS
    : ALL_ICONS;
  useEffect(() => {
    if (skill) {
      setCategoryId(skill.categoryId);
      setName(skill.name);
      setIconKey(skill.iconKey as SkillIconKey);
      setIsVisible(skill.isVisible);
    } else {
      setCategoryId("");
      setName("");
      setIconKey("FaReact");
      setIsVisible(true);
    }
  }, [skill, open]);

  const submit = () => {
    if (!categoryId || !name) return;

    onSubmit(
      {
        categoryId,
        name,
        iconKey,
        isVisible,
      },
      isEdit
    );

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category */}
          <div className="space-y-1">
            <Label>Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skill Name */}
          <div className="space-y-1">
            <Label>Skill Name *</Label>
            <Input
              autoFocus
              placeholder="React"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Icon Picker */}
          {category && (
            <div className="space-y-2">
              <Label>Icon</Label>
              <IconPicker
                value={iconKey}
                suggestions={icons}
                onChange={setIconKey}
              />
            </div>
          )}

          {/* Visibility */}
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch checked={isVisible} onCheckedChange={setIsVisible} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>{isEdit ? "Update" : "Add"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
