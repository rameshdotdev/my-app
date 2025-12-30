// category-editor.tsx
import { SkillCategory } from "@/types/type";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function CategoryEditor({
  categories,
  onChange,
}: {
  categories: SkillCategory[];
  onChange: (v: SkillCategory[]) => void;
}) {
  const update = (id: string, patch: Partial<SkillCategory>) =>
    onChange(categories.map((c) => (c._id === id ? { ...c, ...patch } : c)));

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat._id} className="border rounded-xl p-4 space-y-3">
          <div className="flex gap-2">
            <Input value={cat.title} disabled className="font-mono" />
            <Input
              value={cat.subTitle}
              onChange={(e) => update(cat._id, { subTitle: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Input
              type="number"
              className="w-24"
              value={cat.order}
              onChange={(e) =>
                update(cat._id, { order: Number(e.target.value) })
              }
            />
            <Switch
              checked={cat.isVisible}
              onCheckedChange={(v) => update(cat._id, { isVisible: v })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
