import { SkillIconKey } from "./skill-icons";

export const ICON_SUGGESTIONS: Record<string, SkillIconKey[]> = {
  /* =========================
     PROGRAMMING / LANGUAGES
  ========================= */
  PROGRAMMING: [
    "FaCode",
    "FaJava",
    "FaPython",
    "FaRust",
    "FaPhp",
    "DiJavascript1",
    "DiHtml5",
    "DiCss3",
  ],

  /* =========================
     FRONTEND
  ========================= */
  FRONTEND: [
    "FaReact",
    "DiReact",
    "SiNextdotjs",
    "SiTypescript",
    "SiTailwindcss",
    "FaBootstrap",
    "Layout",
  ],

  /* =========================
     BACKEND
  ========================= */
  BACKEND: ["FaNodeJs", "DiNodejsSmall", "SiExpress", "FaLaravel", "SiGraphql"],

  /* =========================
     DATABASE
  ========================= */
  DATABASE: ["DiMongodb", "DiPostgresql", "DiMysql", "FaDatabase", "Database"],

  /* =========================
     TOOLS & PLATFORMS
  ========================= */
  TOOLS_AND_PLATFORMS: [
    "FaGit",
    "DiGithubBadge",
    "FaDocker",
    "FaAws",
    "FaLinux",
    "FaCloud",
    "FcWorkflow",
    "VscVscode",
    "TbBrandVscode",
  ],

  /* =========================
     AI & DATA SCIENCE
  ========================= */
  AI_AND_DATA_SCIENCE: ["FaPython", "Cpu", "FaDatabase"],
};
