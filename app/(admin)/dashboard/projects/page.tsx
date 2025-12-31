"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Project } from "@/types/type";
import { ProjectCard } from "./project-card";
import ProjectCardSkeleton from "./loading";
import { ProjectFormModal } from "./project-form-modal";
import { ConfirmDeleteDialog } from "./delete-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  getProjects,
  setProjects,
  togglePublishOptimistic,
} from "@/store/features/projectSlice";
import { deleteProject, toggleProjectStatus } from "@/lib/api/project";

export default function ProjectsPage() {
  /* ======================
     Redux State
  ====================== */
  const projects = useAppSelector(getProjects);
  const dispatch = useAppDispatch();

  /* ======================
     UI State
  ====================== */
  const [loading, setLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const [selected, setSelected] = useState<Project | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  /* ======================
     Fetch Projects (Scoped)
  ====================== */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get<Project[]>("/projects");
      dispatch(setProjects(res.data));
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     Optimistic Publish Toggle
  ====================== */
  const handleTogglePublish = async (projectId: string) => {
    if (updatingIds.has(projectId)) return;

    // lock this project
    setUpdatingIds((prev) => new Set(prev).add(projectId));

    // optimistic redux update
    dispatch(togglePublishOptimistic(projectId));

    try {
      await toggleProjectStatus(projectId);
    } catch {
      // safest rollback
      fetchProjects();
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  };

  /* ======================
     Render
  ====================== */
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
              updating={updatingIds.has(project._id)}
              onTogglePublish={() => handleTogglePublish(project._id)}
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

      {/* Create / Edit Modal */}
      <ProjectFormModal
        open={openForm}
        project={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
        }}
        onSuccess={fetchProjects}
      />

      {/* Delete Modal */}
      <ConfirmDeleteDialog
        open={openDelete}
        title={`Delete "${selected?.title}"?`}
        description="This project and its image will be permanently deleted."
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await deleteProject(selected!._id);
          fetchProjects();
        }}
      />
    </div>
  );
}
