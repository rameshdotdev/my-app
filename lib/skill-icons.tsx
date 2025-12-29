import {
  FaGit,
  FaGithub,
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { DiJavascript1, DiMongodb } from "react-icons/di";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { JSX } from "react";

export const skillIconMap: Record<string, JSX.Element> = {
  FaGit: <FaGit />,
  FaGithub: <FaGithub />,
  FaJava: <FaJava />,
  FaPython: <FaPython />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  DiJavascript1: <DiJavascript1 />,
  DiMongodb: <DiMongodb />,
  SiTailwindcss: <SiTailwindcss />,
  SiNextdotjs: <SiNextdotjs />,
};
