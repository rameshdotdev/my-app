"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";

/* ======================
   Types
====================== */

export interface Technology {
  name: string;
  iconKey: keyof typeof iconMap;
}

export interface SkillCategory {
  category: string;
  technologies: Technology[];
}

/* ======================
   Icon Mapper
   (API → React Icons)
====================== */

import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiGithubBadge,
  DiPostgresql,
  DiMysql,
} from "react-icons/di";
import {
  FaDatabase,
  FaCode,
  FaGit,
  FaCloud,
  FaPython,
  FaRust,
  FaPhp,
  FaLaravel,
  FaBootstrap,
  FaJava,
} from "react-icons/fa";
import {
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { useSocket } from "@/providers/socket-provider";

const iconMap = {
  // ===== Languages =====
  FaCode: <FaCode className="text-4xl text-blue-500" />,
  FaJava: <FaJava className="text-4xl text-green-500" />,
  FaPython: <FaPython className="text-4xl text-yellow-500" />,
  FaRust: <FaRust className="text-4xl" />,
  DiJavascript1: <DiJavascript1 className="text-4xl text-yellow-500" />,
  FaPhp: <FaPhp className="text-4xl text-[#798CC2]" />,
  DiHtml5: <DiHtml5 className="text-4xl text-orange-600" />,
  DiCss3: <DiCss3 className="text-4xl text-blue-600" />,
  FaDatabase: <FaDatabase className="text-4xl text-green-500" />,

  // ===== Frameworks =====
  DiReact: <DiReact className="text-4xl text-blue-500" />,
  DiNodejsSmall: <DiNodejsSmall className="text-4xl text-green-500" />,
  SiExpress: (
    <SiExpress className="text-4xl text-gray-700 dark:text-gray-300" />
  ),
  SiNextdotjs: (
    <SiNextdotjs className="text-4xl text-gray-700 dark:text-gray-300" />
  ),
  FaLaravel: <FaLaravel className="text-4xl text-red-700" />,
  SiTailwindcss: <SiTailwindcss className="text-4xl text-sky-400" />,
  FaBootstrap: <FaBootstrap className="text-4xl text-[#8311F6]" />,

  // ===== Dev Tools =====
  FaGit: <FaGit className="text-4xl text-orange-500" />,
  DiGithubBadge: (
    <DiGithubBadge className="text-4xl text-gray-600 dark:text-gray-300" />
  ),
  VscVscode: <VscVscode className="text-4xl text-[#0A71B2]" />,
  SiFirebase: <SiFirebase className="text-4xl text-yellow-500" />,
  FaCloud: <FaCloud className="text-4xl text-blue-500" />,
  DiMongodb: <DiMongodb className="text-4xl text-green-500" />,
  DiMysql: <DiMysql className="text-4xl text-[#005772]" />,
  DiPostgresql: <DiPostgresql className="text-4xl text-blue-500" />,
} as const;

/* ======================
   Component
====================== */

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillCategory[] | null>(null);
  const socket = useSocket();

  const fetchSkills = async () => {
    try {
      const res = await api.get<SkillCategory[]>("/skills");
      setSkills(res.data);
    } catch (error) {
      console.error("Failed to load skills", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    socket.on("skills:updated", () => {
      fetchSkills();
    });

    return () => {
      socket.off("skills:updated");
    };
  }, [socket]);

  if (!skills) return null;
  return (
    <section
      id="skills"
      className="mb-24 max-w-full overflow-x-hidden text-foreground md:mb-12"
    >
      <div className="container mx-auto max-w-[95%] lg:max-w-[80%]">
        <h2 className="py-6 text-center text-3xl font-bold">Skills</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card
              key={skill.category}
              className="
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-lg
  hover:border-foreground/20
  dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]
"
            >
              <CardHeader>
                <CardTitle className="text-center">{skill.category}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {skill.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="transition-transform duration-200 hover:scale-105">
                        {iconMap[tech.iconKey] ?? (
                          <span className="text-xs text-destructive">
                            Icon missing
                          </span>
                        )}
                      </div>

                      <span className="text-sm text-muted-foreground">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
