"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

type IconKey =
  | "github"
  | "linkedin"
  | "x"
  | "youtube"
  | "codepen"
  | "vercel"
  | "buymeacoffee"
  | "email";

const ICON_KEYS: IconKey[] = [
  "github",
  "linkedin",
  "x",
  "youtube",
  "codepen",
  "vercel",
  "buymeacoffee",
  "email",
];

const REQUIRED_SOCIALS = ["GitHub", "LinkedIn"];

const iconPreviewMap: Record<IconKey, React.ReactNode> = {
  github: <Icons.github className="h-4 w-4" />,
  linkedin: <Icons.linkedin className="h-4 w-4" />,
  x: <Icons.x className="h-4 w-4" />,
  youtube: <Icons.youtube className="h-4 w-4" />,
  codepen: <Icons.codepen className="h-4 w-4" />,
  vercel: <Icons.vercel />,
  buymeacoffee: <Icons.buyMeACoffee className="h-4 w-4" />,
  email: <Icons.email className="h-4 w-4" />,
};

export default function SocialEditor({
  socials,
  setSocials,
}: {
  socials: [string, any][];
  setSocials: (val: [string, any][]) => void;
}) {
  const update = (i: number, key: string, value: any) => {
    const next = [...socials];
    next[i][1] = { ...next[i][1], [key]: value };
    setSocials(next);
  };

  const remove = (i: number) => {
    const name = socials[i][0];

    if (REQUIRED_SOCIALS.includes(name)) {
      toast.error(`${name} cannot be removed`);
      return;
    }

    setSocials(socials.filter((_, idx) => idx !== i));
    toast.success(`${name} removed`);
  };

  const addNew = () => {
    setSocials([
      ...socials,
      ["", { name: "", url: "", icon: "github", navbar: false }],
    ]);

    toast.success("New social added");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Social Links</h3>

      {socials.map(([key, social], i) => (
        <div
          key={i}
          className="rounded-lg border p-4 grid gap-3 md:grid-cols-5 items-center"
        >
          {/* Name */}
          <Input
            placeholder="Name"
            value={social.name}
            onChange={(e) => update(i, "name", e.target.value)}
          />

          {/* URL */}
          <Input
            placeholder="URL"
            value={social.url}
            onChange={(e) => update(i, "url", e.target.value)}
          />

          {/* Icon Select */}
          <Select
            value={social.icon}
            onValueChange={(value: IconKey) => update(i, "icon", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {ICON_KEYS.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <div className="flex items-center gap-2">
                    {iconPreviewMap[icon]}
                    <span className="capitalize">{icon}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Navbar toggle */}
          <div className="flex items-center gap-2">
            <Switch
              checked={social.navbar}
              onCheckedChange={(v) => update(i, "navbar", v)}
            />
            <span className="text-sm">Navbar</span>
          </div>

          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            disabled={REQUIRED_SOCIALS.includes(key)}
            onClick={() => remove(i)}
          >
            Delete
          </Button>
        </div>
      ))}

      <Button variant="outline" onClick={addNew}>
        + Add Social
      </Button>
    </div>
  );
}
