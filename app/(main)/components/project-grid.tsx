"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/type";
import { ProjectCard } from "./ProjectCard";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

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
      {/* Header */}

      <BlurFade delay={BLUR_FADE_DELAY * 11} className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Featured Projects
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Real-world applications built with modern technologies
        </p>
      </BlurFade>

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
