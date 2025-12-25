"use client";

import { useEffect, useState } from "react";
import { Skill } from "@/types/type";
import { api } from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  open: boolean;
  skill: Skill | null;
  onClose: () => void;
  onSuccess: () => void;
};

const categories = ["LANGUAGES", "FRAMEWORKS", "DEV_TOOLS"];

export function SkillFormModal({ open, skill, onClose, onSuccess }: Props) {
  const isEdit = Boolean(skill);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("LANGUAGES");
  const [iconKey, setIconKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setCategory(skill.category);
      setIconKey(skill.iconKey);
    }
  }, [skill]);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = { name, category, iconKey };

    if (isEdit) {
      await api.put(`/skills/${skill!._id}`, payload);
    } else {
      await api.post("/skills", payload);
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Icon Key</Label>
            <Input
              placeholder="FaReact / DiNodejsSmall"
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {isEdit ? "Update Skill" : "Add Skill"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
