"use client";
import React from "react";
import { Edit2, AlignLeft, GripVertical } from "lucide-react";
import { Reorder } from "motion/react";
import { Experience } from "../resume-type";
import { JsonEditor } from "./JsonEditor";

interface ExperienceSectionProps {
  experience: Experience[];
  isEditMode: boolean;
  isReordering: boolean;
  editingSection: string | null;
  sectionEditValue: string;
  setEditingSection: (section: string | null) => void;
  setSectionEditValue: (value: string) => void;
  handleSectionSave: (sectionId: string) => void;
  onReorder: (newExperience: Experience[]) => void;
}

export const ExperienceSection = ({
  experience,
  isEditMode,
  isReordering,
  editingSection,
  sectionEditValue,
  setEditingSection,
  setSectionEditValue,
  handleSectionSave,
  onReorder,
}: ExperienceSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-display font-black uppercase tracking-widest text-black dark:text-zinc-100 whitespace-nowrap">
            Experience
          </h2>
          {!isReordering && !editingSection && isEditMode && (
            <button
              onClick={() => {
                setEditingSection("experience");
                setSectionEditValue(JSON.stringify(experience, null, 2));
              }}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-print"
              title="Edit Experience"
            >
              <Edit2 size={12} />
            </button>
          )}
        </div>
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
      </div>

      {editingSection === "experience" ? (
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
              onClick={() => handleSectionSave("experience")}
              className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider rounded hover:opacity-80 transition-opacity"
            >
              Save Section
            </button>
          </div>
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={experience}
          onReorder={onReorder}
          className="space-y-4"
        >
          {experience.map((exp, idx) => (
            <Reorder.Item
              key={exp.company + exp.role}
              value={exp}
              dragListener={isReordering}
              className={`relative ${isReordering ? "cursor-grab active:cursor-grabbing" : ""}`}
            >
              {isReordering && (
                <div className="absolute -left-6 top-1 text-zinc-300 dark:text-zinc-700 no-print">
                  <GripVertical size={14} />
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[13px] text-black dark:text-white">
                    {exp.company}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span className="text-zinc-700 dark:text-zinc-400 font-medium italic">
                    {exp.role}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-zinc-700 dark:text-zinc-400 font-mono text-[10px] bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {exp.mode && (
                    <span className="text-zinc-500 dark:text-zinc-500 font-medium text-[9px] uppercase tracking-wider">
                      {exp.mode}
                    </span>
                  )}
                </div>
              </div>
              <ul className="list-none space-y-1 text-zinc-900 dark:text-zinc-300 pl-1">
                {exp.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="grid grid-cols-[12px_1fr] gap-1.5 leading-snug"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600 mt-1.5 text-[10px] leading-none select-none">
                      •
                    </span>
                    <span className="text-[13px]">{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </section>
  );
};
