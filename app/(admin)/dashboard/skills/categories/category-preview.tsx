import { SkillCategory } from "@/types/type";

export default function CategoryPreview({
  categories,
}: {
  categories: SkillCategory[];
}) {
  return (
    <div className="space-y-4 rounded-xl border bg-muted/40 p-6">
      {categories
        .sort((a, b) => a.order - b.order)
        .map((cat) => (
          <div key={cat._id}>
            <h3 className="font-semibold text-primary">{cat.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {cat.subTitle}
            </p>
          </div>
        ))}
    </div>
  );
}
