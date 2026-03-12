"use client";
import { Edit2, AlignLeft, GripVertical } from 'lucide-react';
import { Reorder } from 'motion/react';
import { Education } from '../resume-type';
import { JsonEditor } from './JsonEditor';

interface EducationSectionProps {
  education: Education[];
  isEditMode: boolean;
  isReordering: boolean;
  editingSection: string | null;
  sectionEditValue: string;
  setEditingSection: (section: string | null) => void;
  setSectionEditValue: (value: string) => void;
  handleSectionSave: (sectionId: string) => void;
  onReorder: (newEducation: Education[]) => void;
}

export const EducationSection = ({
  education,
  isEditMode,
  isReordering,
  editingSection,
  sectionEditValue,
  setEditingSection,
  setSectionEditValue,
  handleSectionSave,
  onReorder
}: EducationSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-display font-black uppercase tracking-widest text-black dark:text-zinc-100 whitespace-nowrap">
            Education
          </h2>
          {!isReordering && !editingSection && isEditMode && (
            <button
              onClick={() => {
                setEditingSection('education');
                setSectionEditValue(JSON.stringify(education, null, 2));
              }}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors no-print"
              title="Edit Education"
            >
              <Edit2 size={12} />
            </button>
          )}
        </div>
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
      </div>

      {editingSection === 'education' ? (
        <div className="space-y-3 no-print">
          <JsonEditor
            value={sectionEditValue}
            onChange={setSectionEditValue}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                try {
                  const parsed = JSON.parse(sectionEditValue);
                  if (parsed) {
                    setSectionEditValue(JSON.stringify(parsed, null, 2));
                  }
                } catch (e) {
                  alert('Cannot format invalid JSON');
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
              onClick={() => handleSectionSave('education')}
              className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider rounded hover:opacity-80 transition-opacity"
            >
              Save Section
            </button>
          </div>
        </div>
      ) : (
        <Reorder.Group axis="y" values={education} onReorder={onReorder} className="space-y-4">
          {education.map((edu, idx) => (
            <Reorder.Item 
              key={edu.institution + edu.degree} 
              value={edu}
              dragListener={isReordering}
              className={`relative ${isReordering ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              {isReordering && (
                <div className="absolute -left-6 top-1 text-zinc-300 dark:text-zinc-700 no-print">
                  <GripVertical size={14} />
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-[13px] text-black dark:text-white">{edu.institution}</span>
                <span className="italic text-zinc-800 dark:text-zinc-400">{edu.degree}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-zinc-700 dark:text-zinc-400 font-mono text-[10px] bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                  {edu.startDate} – {edu.endDate}
                </span>
                <span className="font-display text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Score: {edu.percentage}
                </span>
              </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </section>
  );
};
