"use client";
import { Edit2, AlignLeft } from "lucide-react";
import { Skill } from "../resume-type";
import { JsonEditor } from "./JsonEditor";

interface SkillsSectionProps {
  skills: Skill[];
  isEditMode: boolean;
  isReordering: boolean;
  editingSection: string | null;
  sectionEditValue: string;
  setEditingSection: (section: string | null) => void;
  setSectionEditValue: (value: string) => void;
  handleSectionSave: (sectionId: string) => void;
}

export const SkillsSection = ({
  skills,
  isEditMode,
  isReordering,
  editingSection,
  sectionEditValue,
  setEditingSection,
  setSectionEditValue,
  handleSectionSave,
}: SkillsSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-display font-black uppercase tracking-widest text-black dark:text-zinc-100 whitespace-nowrap">
            Technical Skills
          </h2>
          {!isReordering && !editingSection && isEditMode && (
            <button
              onClick={() => {
                setEditingSection("skills");
                setSectionEditValue(JSON.stringify(skills, null, 2));
              }}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-print"
              title="Edit Skills"
            >
              <Edit2 size={12} />
            </button>
          )}
        </div>
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
      </div>

      {editingSection === "skills" ? (
        <div className="space-y-3 no-print">
          <JsonEditor value={sectionEditValue} onChange={setSectionEditValue} />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                try {
                  const parsed = JSON.parse(sectionEditValue);
                  if (parsed) {
                    setSectionEditValue(JSON.stringify(parsed, null, 2));
                  }
                } catch (e) {
                  alert("Cannot format invalid JSON");
                }
              }}
              className="px-3 py-1 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <AlignLeft size={10} /> Format
            </button>
            <button
              onClick={() => setEditingSection(null)}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSectionSave("skills")}
              className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider rounded hover:opacity-80 transition-opacity"
            >
              Save Section
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-1">
          {skills.map((skill, idx) => (
            <div key={idx} className="flex gap-1 break-inside-avoid">
              <span className="font-display font-bold text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400">
                {skill.category + ":"}
              </span>
              <span className="text-zinc-950 dark:text-zinc-200 font-medium leading-snug">
                {skill.items.join(" • ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
