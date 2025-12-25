"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectFormModal } from "./project-form-modal";
import { ConfirmDeleteDialog } from "./delete-dialog";
import { Project } from "@/types/type";
import { ProjectCard } from "./project-card";
import ProjectCardSkeleton from "./loading";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selected, setSelected] = useState<Project | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await api.get<Project[]>("/projects/admin");
    setProjects(res.data);
    setLoading(false);
  };

  const togglePublishOptimistic = async (projectId: string) => {
    if (updatingId) return;

    const prevProjects = projects;
    setUpdatingId(projectId);

    setProjects((prev) =>
      prev.map((project) =>
        project._id === projectId
          ? { ...project, isPublished: !project.isPublished }
          : project
      )
    );

    try {
      await api.put(`/projects/status/${projectId}`);
    } catch (error) {
      setProjects(prevProjects);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and publish your portfolio projects
          </p>
        </div>

        <Button onClick={() => setOpenForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}

        {!loading &&
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              updating={updatingId === project._id}
              onTogglePublish={() => togglePublishOptimistic(project._id)}
              onEdit={() => {
                setSelected(project);
                setOpenForm(true);
              }}
              onDelete={() => {
                setSelected(project);
                setOpenDelete(true);
              }}
            />
          ))}
      </div>

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No projects yet. Start by adding your first project.
          </p>
          <Button className="mt-4" onClick={() => setOpenForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      )}

      {/* Modals */}
      <ProjectFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
        }}
        project={selected}
        onSuccess={fetchProjects}
      />

      <ConfirmDeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title={`Delete "${selected?.title}"?`}
        description="This project and its image will be permanently deleted."
        onConfirm={async () => {
          await api.delete(`/projects/${selected!._id}`);
          fetchProjects();
        }}
      />
    </div>
  );
}
