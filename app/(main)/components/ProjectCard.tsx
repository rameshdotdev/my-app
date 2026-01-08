"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ChevronRight, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/type";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const techStackArray = useMemo(
    () => project.techStack.split(", ").filter(Boolean),
    [project.techStack]
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden rounded-3xl border border-border/40 bg-background shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image.url}
            alt={project.title}
            fill
            priority={index < 2}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Featured badge */}
          {index === 0 && (
            <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Featured
              </span>
            </div>
          )}

          {/* Tech badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1">
            {techStackArray.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-background/80 text-[10px] backdrop-blur"
              >
                {tech}
              </Badge>
            ))}
            {techStackArray.length > 3 && (
              <Badge variant="outline" className="text-[10px]">
                +{techStackArray.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="relative p-6">
          <div className="mb-6">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>

            <ul className="space-y-2">
              {project.description.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild size="sm" className="flex-1 rounded-xl">
              <a
                href={project.links.site}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live site for ${project.title}`}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 rounded-xl"
            >
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title}`}
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
