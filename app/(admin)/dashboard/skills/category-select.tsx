"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillCategory } from "@/types/type";

export function CategorySelect({
  categories,
  value,
  onChange,
}: {
  categories: SkillCategory[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <Select value={value ?? ""} onValueChange={onChange}>
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
  );
}
