"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Pin } from "lucide-react";
import { IconBrandGithub, IconLink, IconFileText } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import type { Project, ProjectStatus } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  updating: boolean;
  onDelete: () => void;
}

function getStatusLabel(status: ProjectStatus) {
  if (status === "live") return "Live";
  if (status === "building") return "Building";
  return "Offline";
}

function getStatusClasses(status: ProjectStatus) {
  if (status === "live") return "bg-primary/10 text-primary border-primary/20";
  if (status === "building")
    return "bg-muted text-muted-foreground border-border";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

export function ProjectCard({
  project,
  onEdit,
  updating,
  onDelete,
}: ProjectCardProps) {
  const { resolvedTheme } = useTheme();

  const stackText =
    project?.stack?.length > 0 ? project.stack.join(" • ") : "No stack added";

  const descriptionText =
    project?.description?.length > 0
      ? project.description.join(" • ")
      : "No description added";

  const imageUrl =
    resolvedTheme === "dark" ? project.image.dark.url : project.image.light.url;

  return (
    <Card className="group overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={project.title}
          className="h-40 w-full object-cover"
        />

        {/* Status Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span
            className={[
              "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium backdrop-blur",
              getStatusClasses(project.status),
            ].join(" ")}
          >
            {getStatusLabel(project.status)}
          </span>

          {/* Pinned Badge */}
          {project.isPinned && (
            <span className="inline-flex items-center gap-1 rounded-full border bg-background/60 px-2 py-0.5 text-xs font-medium">
              <Pin className="h-3.5 w-3.5" />
              Pinned
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold leading-tight">{project.title}</h3>

        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
          {stackText}
        </p>

        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {descriptionText}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1 sm:gap-2">
            {project.links.github && (
              <Button asChild size="icon" variant="ghost">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub repo"
                >
                  <IconBrandGithub className="h-4 w-4" />
                </a>
              </Button>
            )}

            {project.links.site && (
              <Button asChild size="icon" variant="ghost">
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open live site"
                >
                  <IconLink className="h-4 w-4" />
                </a>
              </Button>
            )}

            {project.links.post && (
              <Button asChild size="icon" variant="ghost">
                <a
                  href={project.links.post}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open project post"
                >
                  <IconFileText className="h-4 w-4" />
                </a>
              </Button>
            )}

            <Button
              size="icon"
              variant="outline"
              onClick={onEdit}
              disabled={updating}
              aria-label="Edit project"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={onDelete}
              disabled={updating}
              aria-label="Delete project"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
