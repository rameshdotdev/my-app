/* =========================
   react-icons (DI)
========================= */
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

/* =========================
   react-icons (FA)
========================= */
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
  FaReact,
  FaNodeJs,
  FaDocker,
  FaLinux,
  FaAws,
  FaFigma,
} from "react-icons/fa";

/* =========================
   react-icons (SI)
========================= */
import {
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiRedux,
  SiVercel,
  SiVite,
} from "react-icons/si";

/* =========================
   react-icons (Others)
========================= */
import { VscVscode } from "react-icons/vsc";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";

/* =========================
   lucide-react
========================= */
import { Code2, Paintbrush, Database, Layout, Cpu, Cloud } from "lucide-react";

/* =========================
   CENTRAL ICON REGISTRY
========================= */
export const skillIconMap = {
  /* ===== Languages ===== */
  FaCode,
  FaJava,
  FaPython,
  FaRust,
  FaPhp,
  DiJavascript1,
  DiHtml5,
  DiCss3,
  FaDatabase,

  /* ===== Frontend ===== */
  FaReact,
  DiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  FaBootstrap,
  Layout,

  /* ===== Backend ===== */
  FaNodeJs,
  DiNodejsSmall,
  SiExpress,
  FaLaravel,
  SiGraphql,

  /* ===== Database ===== */
  DiMongodb,
  DiPostgresql,
  DiMysql,
  Database,

  /* ===== Dev Tools ===== */
  FaGit,
  DiGithubBadge,
  FaCloud,
  FaDocker,
  FaLinux,
  FaAws,
  FcWorkflow,

  /* ===== Tooling ===== */
  VscVscode,
  TbBrandVscode,
  SiFirebase,
  SiJest,
  SiWebpack,
  SiRedux,
  SiVercel,
  SiVite,

  /* ===== Creative / UI ===== */
  FaFigma,
  MdAnimation,
  Paintbrush,

  /* ===== Generic / System ===== */
  BsFileEarmarkCode,
  BsGrid1X2,
  Code2,
  Cpu,
  Cloud,
} as const;

/* =========================
   TYPES
========================= */
export type SkillIconKey = keyof typeof skillIconMap;

/* =========================
   ALL ICONS (Picker Fallback)
========================= */
export const ALL_ICONS = Object.keys(skillIconMap) as SkillIconKey[];
