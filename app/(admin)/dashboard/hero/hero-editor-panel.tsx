import { Hero } from "@/types/type";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

export default function HeroEditorPanel({
  value,
  onChange,
}: {
  value: Hero;
  onChange: (v: Hero) => void;
}) {
  const update = (patch: Partial<Hero>) => onChange({ ...value, ...patch });

  const updateTitle = (i: number, title: string) => {
    const titles = [...value.titles];
    titles[i] = title;
    update({ titles });
  };

  const removeTitle = (i: number) =>
    update({ titles: value.titles.filter((_, idx) => idx !== i) });

  return (
    <div className="rounded-xl border p-6 space-y-6">
      <h2 className="text-lg font-semibold">🎭 Identity Controls</h2>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={value.name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          value={value.description}
          onChange={(e) => update({ description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Resume URL</Label>
        <Input
          value={value.resumeUrl}
          onChange={(e) => update({ resumeUrl: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label>Titles (Animation Order)</Label>

        {value.titles.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border p-2"
          >
            <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
            <Input value={t} onChange={(e) => updateTitle(i, e.target.value)} />
            <Button size="icon" variant="ghost" onClick={() => removeTitle(i)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => update({ titles: [...value.titles, "New Title"] })}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Title
        </Button>
      </div>
    </div>
  );
}
