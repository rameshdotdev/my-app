"use client";

import { useEffect, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ImagePlus } from "lucide-react";
import { Project } from "@/types/type";
import { createProject, updateProject } from "@/lib/api/project";

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: () => void;
};

export function ProjectFormModal({ open, onClose, project, onSuccess }: Props) {
  const isEdit = Boolean(project);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [site, setSite] = useState("");
  const [github, setGithub] = useState("");
  const [image, setImage] = useState<Project["image"] | null>(null);

  useEffect(() => {
    if (project) {
      // ✏️ Edit mode → populate form
      setTitle(project.title);
      setTechStack(project.techStack);
      setDescription(project.description.join("\n"));
      setSite(project.links.site || "");
      setGithub(project.links.github || "");
      setImage(project.image);
    } else {
      // ➕ Create mode → reset form
      setTitle("");
      setTechStack("");
      setDescription("");
      setSite("");
      setGithub("");
      setImage(null);
    }
  }, [project]);

  /* =========================
     Image Upload
  ========================= */
  const handleImageChange = async (file: File) => {
    try {
      setUploading(true);
      const res = await uploadToCloudinary(file);
      setImage({ url: res.secure_url, publicId: res.public_id });
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     Submit
  ========================= */
  const handleSubmit = async () => {
    if (!title || !techStack || !description || !image) return;

    setLoading(true);

    const payload = {
      title,
      techStack,
      image,
      description: description.split("\n").filter(Boolean),
      links: { site, github },
    };

    if (isEdit) {
      await updateProject(project!._id, payload);
    } else {
      await createProject(payload);
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        {/* ================= HEADER ================= */}
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <DialogTitle className="text-xl">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        {/* ================= SCROLLABLE BODY ================= */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Project Title *</Label>
            <Input
              placeholder="Aryan Real Estate Platform"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label>Tech Stack *</Label>
            <Input
              placeholder="React, Node, MongoDB"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              placeholder="Built a full-stack MERN app..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Project Image *</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageChange(e.target.files[0])
                }
              />
              {uploading && (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              )}
            </div>

            {image && (
              <img
                src={image.url}
                alt="preview"
                className="mt-3 h-40 w-full rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Live Site</Label>
              <Input
                placeholder="https://example.com"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>GitHub Repo</Label>
              <Input
                placeholder="https://github.com/..."
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t px-6 py-4 flex justify-end gap-3 bg-background sticky bottom-0">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading || uploading || !image}
          >
            {(loading || uploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEdit ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
