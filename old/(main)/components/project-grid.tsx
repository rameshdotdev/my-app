"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/type";
import { ProjectCard } from "./ProjectCard";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const allTech = useMemo(
    () =>
      Array.from(
        new Set(
          projects.flatMap((p) => p.techStack.split(", ").filter(Boolean))
        )
      ).slice(0, 8),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return projects;
    return projects.filter((p) =>
      p.techStack.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  }, [projects, selectedFilter]);

  return (
    <div id="projects">
      {/* ================= Section Header ================= */}
      <div className="max-w-3xl mx-auto md:text-center pb-6">
        <BlurFade delay={BLUR_FADE_DELAY * 1.5} className="inline-block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight relative">
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Projects
            </span>

            {/* Animated underline (replays on filter change) */}
            <motion.span
              key={selectedFilter} // 🔑 THIS is the magic
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
          absolute -bottom-2 left-0
          h-0.75 w-full
          origin-left
          rounded-full
          bg-linear-to-r from-primary to-primary/40
        "
            />
          </h2>
        </BlurFade>

        <BlurFadeText
          delay={BLUR_FADE_DELAY * 1.6}
          yOffset={8}
          className="mt-4 text-muted-foreground text-base sm:text-lg"
          text="A curated selection of real-world projects showcasing problem-solving,
    architecture decisions, and modern development practices."
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["all", ...allTech].map((tech, index) => (
          <BlurFade key={tech} delay={BLUR_FADE_DELAY * 6 + index * 0.05}>
            <button
              onClick={() => setSelectedFilter(tech)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedFilter === tech
                  ? "bg-primary text-primary-foreground shadow font-bold"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted font-medium"
              }`}
            >
              {tech === "all" ? "All Projects" : tech}
            </button>
          </BlurFade>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project, index) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + index * 0.05}
          >
            <ProjectCard project={project} index={index} />
          </BlurFade>
        ))}
      </motion.div>

      {/* Empty */}
      {filteredProjects.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No projects found for this filter.
        </div>
      )}
    </div>
  );
}

// Usage example in your main component:
export default function ProjectsSection() {
  const projects = [
    {
      _id: "694cf8bc5adf0b915fa95450",
      title: "MERN Real Estate",
      image: {
        url: "https://res.cloudinary.com/dvzsnzhka/image/upload/v1766652071/j9vxm3oid6d0usotkgpc.png",
        publicId: "j9vxm3oid6d0usotkgpc",
      },
      techStack:
        "React.js, Tailwind CSS, Redux Toolkit, Node.js, Express.js, MongoDB, JWT",
      description: [
        "Built a full-stack MERN real estate platform with JWT and Google OAuth authentication.",
        "Implemented protected routes and complete CRUD for property listings.",
        "Developed advanced MongoDB search with filtering and sorting.",
      ],
      links: {
        site: "https://aryan-estate.onrender.com",
        github: "https://github.com/rameshdotdev/aryan_estate",
      },
      isPublished: true,
      createdAt: "2025-12-25T08:41:32.240Z",
      updatedAt: "2025-12-31T07:29:49.753Z",
      __v: 0,
    },
    // Add more projects here...
  ];

  return <ProjectsGrid projects={projects} />;
}
