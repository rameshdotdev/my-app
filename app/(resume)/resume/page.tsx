"use client";
import "../resume.css";
import React, { useState, useEffect } from "react";
import {
  Download,
  Edit2,
  Edit3,
  Check,
  X,
  GripVertical,
  ListOrdered,
  Sun,
  Moon,
  AlignLeft,
  Github,
  Globe,
  Linkedin,
  Mail,
} from "lucide-react";
import { Reorder } from "motion/react";
import resumeDataJson from "./data.json";
import { ResumeData } from "../resume-type";
import { JsonEditor } from "../components/JsonEditor";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import ThemeToggler from "@/components/theme-toggler";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import BackBtn from "@/app/(dashed-main)/components/back-btn";

const IconMap = {
  github: Github,
  website: Globe,
  linkedin: Linkedin,
  email: Mail,
};

export default function App() {
  const user = useAppSelector((store: RootState) => store.user);
  const [data, setData] = useState<ResumeData>(resumeDataJson as ResumeData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "experience",
    "projects",
    "skills",
    "education",
  ]);
  const [editValue, setEditValue] = useState(
    JSON.stringify(resumeDataJson, null, 2),
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionEditValue, setSectionEditValue] = useState("");

  const handleSave = () => {
    try {
      const parsed = JSON.parse(editValue) as ResumeData;
      setData(parsed);
      setIsEditing(false);
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  const handleSectionSave = (sectionId: string) => {
    try {
      const parsed = JSON.parse(sectionEditValue);
      setData((prev) => ({
        ...prev,
        [sectionId]: parsed,
      }));
      setEditingSection(null);
    } catch (e) {
      alert("Invalid JSON format for this section");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-20 bg-background transition-colors duration-500">
      <BackBtn className={"hidden sm:inline-block fixed top-4 left-4 z-100"} />
      {/* Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 no-print z-50">
        {user && user._id && (
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center ${
              isEditMode
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700"
            }`}
            title={isEditMode ? "Exit Edit Mode" : "Own Your & Edit"}
          >
            {isEditMode ? <Check size={24} /> : <Edit3 size={24} />}
          </button>
        )}
        <Button
          onClick={handlePrint}
          className="p-4  rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          title="Print to PDF"
        >
          <Download size={24} />
        </Button>
        <ThemeToggler />

        {isEditMode && (
          <>
            <button
              onClick={() => setIsReordering(!isReordering)}
              className={`p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center ${
                isReordering
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700"
              }`}
              title="Reorder Sections"
            >
              <ListOrdered size={24} />
            </button>
            <button
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                } else {
                  setEditValue(JSON.stringify(data, null, 2));
                  setIsEditing(true);
                }
              }}
              className="p-4 bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
              title="Edit Data"
            >
              {isEditing ? <X size={24} /> : <Edit2 size={24} />}
            </button>
          </>
        )}
      </div>

      {/* JSON Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6 no-print">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-bottom flex justify-between items-center bg-zinc-50">
              <h2 className="font-bold text-lg">Edit Resume Data (JSON)</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(editValue);
                      if (parsed) {
                        setEditValue(JSON.stringify(parsed, null, 2));
                      }
                    } catch (e) {
                      alert("Cannot format invalid JSON");
                    }
                  }}
                  className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <AlignLeft size={16} /> Format
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <Check size={18} /> Save Changes
                </button>
              </div>
            </div>
            <JsonEditor
              value={editValue}
              onChange={setEditValue}
              className="flex-1 overflow-auto"
            />
          </div>
        </div>
      )}

      {/* Resume Page */}
      <div className="a4-page relative bg-white dark:bg-zinc-950 font-sans text-[11px] leading-normal text-zinc-950 dark:text-zinc-100">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col items-center text-center mb-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-normal mb-1 text-black dark:text-white">
              {data.personalInfo.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-zinc-900 dark:text-zinc-400 font-display font-medium px-4">
              {data.personalInfo.links.map((link, idx) => {
                const Icon = IconMap[link.type];
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Icon size={12} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
            {data.personalInfo.lastUpdated && (
              <div className="absolute right-2 top-2 text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                Last updated: {data.personalInfo.lastUpdated}
              </div>
            )}
          </div>
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
        </header>

        {/* Sections */}
        <Reorder.Group
          axis="y"
          values={sectionOrder}
          onReorder={setSectionOrder}
          className="space-y-6"
        >
          {sectionOrder.map((sectionId) => (
            <Reorder.Item
              key={sectionId}
              value={sectionId}
              dragListener={isReordering}
              className={`relative group ${isReordering ? "cursor-grab active:cursor-grabbing" : ""}`}
            >
              {isReordering && (
                <div className="absolute -left-10 top-0 text-zinc-400 group-hover:text-zinc-600 transition-colors no-print">
                  <GripVertical size={20} />
                </div>
              )}

              {sectionId === "projects" && (
                <ProjectsSection
                  projects={data.projects}
                  isEditMode={isEditMode}
                  isReordering={isReordering}
                  editingSection={editingSection}
                  sectionEditValue={sectionEditValue}
                  setEditingSection={setEditingSection}
                  setSectionEditValue={setSectionEditValue}
                  handleSectionSave={handleSectionSave}
                  onReorder={(newProjects) =>
                    setData((prev) => ({ ...prev, projects: newProjects }))
                  }
                />
              )}

              {sectionId === "skills" && (
                <SkillsSection
                  skills={data.skills}
                  isEditMode={isEditMode}
                  isReordering={isReordering}
                  editingSection={editingSection}
                  sectionEditValue={sectionEditValue}
                  setEditingSection={setEditingSection}
                  setSectionEditValue={setSectionEditValue}
                  handleSectionSave={handleSectionSave}
                />
              )}
              {sectionId === "experience" && (
                <ExperienceSection
                  experience={data.experience}
                  isEditMode={isEditMode}
                  isReordering={isReordering}
                  editingSection={editingSection}
                  sectionEditValue={sectionEditValue}
                  setEditingSection={setEditingSection}
                  setSectionEditValue={setSectionEditValue}
                  handleSectionSave={handleSectionSave}
                  onReorder={(newExperience) =>
                    setData((prev) => ({ ...prev, experience: newExperience }))
                  }
                />
              )}
              {sectionId === "education" && (
                <EducationSection
                  education={data.education}
                  isEditMode={isEditMode}
                  isReordering={isReordering}
                  editingSection={editingSection}
                  sectionEditValue={sectionEditValue}
                  setEditingSection={setEditingSection}
                  setSectionEditValue={setSectionEditValue}
                  handleSectionSave={handleSectionSave}
                  onReorder={(newEducation) =>
                    setData((prev) => ({ ...prev, education: newEducation }))
                  }
                />
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
