import { Skill } from "@/types/type";
import { skillIconMap } from "@/lib/skill-icons";

const CATEGORY_LABELS = {
  LANGUAGES: "Languages",
  FRAMEWORKS: "Frameworks",
  DEV_TOOLS: "Dev Tools",
};

export default function SkillLivePreview({ skills }: { skills: Skill[] }) {
  const grouped = Object.keys(CATEGORY_LABELS).map((cat) => ({
    category: cat as Skill["category"],
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="rounded-xl border bg-muted/40 p-6 space-y-6">
      {grouped.map(
        ({ category, skills }) =>
          skills.length > 0 && (
            <div key={category}>
              <h3 className="font-semibold mb-3">
                {CATEGORY_LABELS[category]}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border hover:bg-primary/10 transition"
                  >
                    {skillIconMap[skill.iconKey]}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
