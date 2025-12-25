"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { Project } from "@/types/type";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  updating: boolean;
  onDelete: () => void;
  onTogglePublish: () => void;
}

export function ProjectCard({
  project,
  onEdit,
  updating,
  onDelete,
  onTogglePublish,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative">
        <img
          src={project.image.url}
          alt={project.title}
          className="h-40 w-full object-cover"
        />

        {/* Status badge */}
        <span
          className={cn(
            "absolute top-2 right-2 rounded-md px-2 py-1 text-xs font-medium",
            project.isPublished
              ? "bg-green-600/90 text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          {project.isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold leading-tight">{project.title}</h3>

        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {project.techStack}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Switch
            checked={project.isPublished}
            onCheckedChange={onTogglePublish}
            disabled={updating}
          />

          <div className="flex gap-1 sm:gap-2">
            <Button asChild size="icon" variant="ghost">
              <a href={project.links.github} target="_blank">
                <IconBrandGithub className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild size="icon" variant="ghost">
              <a href={project.links.site} target="_blank">
                <IconLink className="h-4 w-4" />
              </a>
            </Button>

            <Button size="icon" variant="outline" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>

            <Button size="icon" variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
