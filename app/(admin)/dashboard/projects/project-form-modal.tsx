"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import type {
  CreateProjectPayload,
  Project,
  ProjectStatus,
} from "@/types/project";
import { createProject, updateProject } from "@/lib/api/project";

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: () => void;
};

const STATUS_OPTIONS: { label: string; value: ProjectStatus }[] = [
  { label: "Live", value: "live" },
  { label: "Building", value: "building" },
  { label: "Offline", value: "offline" },
];

function normalizeStack(input: string) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeDescription(input: string) {
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProjectFormModal({ open, onClose, project, onSuccess }: Props) {
  const isEdit = Boolean(project);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const [stackInput, setStackInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [site, setSite] = useState("");
  const [github, setGithub] = useState("");
  const [post, setPost] = useState("");

  const [status, setStatus] = useState<ProjectStatus>("building");

  // ⭐ pinned
  const [isPinned, setIsPinned] = useState(false);

  // toggle for dual images
  const [hasTwoImages, setHasTwoImages] = useState(false);

  // new image type: { light, dark }
  const [lightImage, setLightImage] = useState<
    Project["image"]["light"] | null
  >(null);
  const [darkImage, setDarkImage] = useState<Project["image"]["dark"] | null>(
    null,
  );

  const stack = useMemo(() => normalizeStack(stackInput), [stackInput]);
  const description = useMemo(
    () => normalizeDescription(descriptionInput),
    [descriptionInput],
  );

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setSubTitle(project.subTitle);

      setStackInput(project.stack.join(", "));
      setDescriptionInput(project.description.join("\n"));

      setSite(project.links.site || "");
      setGithub(project.links.github || "");
      setPost(project.links.post || "");

      setStatus(project.status);
      setIsPinned(Boolean(project.isPinned));

      // decide if project has 2 different images or not
      const samePublicId =
        project.image.light.publicId === project.image.dark.publicId;

      setHasTwoImages(!samePublicId);

      setLightImage(project.image.light);
      setDarkImage(project.image.dark);
    } else {
      setTitle("");
      setSubTitle("");

      setStackInput("");
      setDescriptionInput("");

      setSite("");
      setGithub("");
      setPost("");

      setStatus("building");
      setIsPinned(false);

      setHasTwoImages(false);

      setLightImage(null);
      setDarkImage(null);
    }
  }, [project]);

  /* =========================
     Image Upload Helpers
  ========================= */
  const uploadAndSetLight = async (file: File) => {
    try {
      setUploading(true);
      const res = await uploadToCloudinary(file);
      const uploaded = { url: res.secure_url, publicId: res.public_id };

      setLightImage(uploaded);

      // if only single image mode → keep both same
      if (!hasTwoImages) {
        setDarkImage(uploaded);
      }
    } finally {
      setUploading(false);
    }
  };

  const uploadAndSetDark = async (file: File) => {
    try {
      setUploading(true);
      const res = await uploadToCloudinary(file);
      const uploaded = { url: res.secure_url, publicId: res.public_id };
      setDarkImage(uploaded);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleTwoImages = (checked: boolean) => {
    setHasTwoImages(checked);

    // if user turns OFF → make dark same as light
    if (!checked && lightImage) {
      setDarkImage(lightImage);
    }
  };

  /* =========================
     Submit
  ========================= */
  const handleSubmit = async () => {
    const finalLight = lightImage;
    const finalDark = hasTwoImages ? darkImage : lightImage;

    if (
      !title.trim() ||
      !subTitle.trim() ||
      stack.length === 0 ||
      description.length === 0 ||
      !finalLight ||
      !finalDark
    ) {
      return;
    }

    setLoading(true);

    const payload: CreateProjectPayload = {
      title: title.trim(),
      subTitle: subTitle.trim(),
      stack,
      description,
      image: {
        light: finalLight,
        dark: finalDark,
      },
      links: {
        site: site.trim() || undefined,
        github: github.trim() || undefined,
        post: post.trim() || undefined,
      },
      status,
      isPinned,
    };

    try {
      if (isEdit) {
        await updateProject(project!._id, payload);
      } else {
        await createProject(payload);
      }

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    !loading &&
    !uploading &&
    title.trim().length > 0 &&
    subTitle.trim().length > 0 &&
    stack.length > 0 &&
    description.length > 0 &&
    lightImage &&
    (hasTwoImages ? Boolean(darkImage) : true);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        {/* ================= HEADER ================= */}
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <DialogTitle className="text-xl">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        {/* ================= BODY ================= */}
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

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Sub Title *</Label>
            <Input
              placeholder="Real estate + CRM dashboard"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          {/* Pinned */}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Pin this project</p>
              <p className="text-xs text-muted-foreground">
                Pinned projects can be shown at the top / featured section.
              </p>
            </div>
            <Switch checked={isPinned} onCheckedChange={setIsPinned} />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status *</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant={status === opt.value ? "default" : "outline"}
                  onClick={() => setStatus(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label>Tech Stack * (comma separated)</Label>
            <Input
              placeholder="React, Node, MongoDB"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
            />
            {stack.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Parsed: {stack.join(" • ")}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description * (one point per line)</Label>
            <Textarea
              placeholder={`Point 1...\nPoint 2...\nPoint 3...`}
              rows={6}
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            {description.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Total points: {description.length}
              </p>
            )}
          </div>

          {/* Image Mode Toggle */}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Separate Dark/Light images?</p>
              <p className="text-xs text-muted-foreground">
                If off, one image will be used for both themes.
              </p>
            </div>
            <Switch
              checked={hasTwoImages}
              onCheckedChange={handleToggleTwoImages}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Project Images *</Label>

            {/* Light Image */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Light Image
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && uploadAndSetLight(e.target.files[0])
                  }
                />
                {uploading && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
              </div>

              {lightImage && (
                <img
                  src={lightImage.url}
                  alt="light preview"
                  className="mt-2 h-40 w-full rounded-lg object-cover border"
                />
              )}
            </div>

            {/* Dark Image */}
            {hasTwoImages && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Dark Image
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && uploadAndSetDark(e.target.files[0])
                    }
                  />
                  {uploading && (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  )}
                </div>

                {darkImage && (
                  <img
                    src={darkImage.url}
                    alt="dark preview"
                    className="mt-2 h-40 w-full rounded-lg object-cover border"
                  />
                )}
              </div>
            )}

            {/* if single image mode, show info */}
            {!hasTwoImages && lightImage && (
              <p className="text-xs text-muted-foreground">
                Using the same image for both Light & Dark.
              </p>
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

            <div className="space-y-2 md:col-span-2">
              <Label>Post / Case Study</Label>
              <Input
                placeholder="https://yourblog.com/project-post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t px-6 py-4 flex justify-end gap-3 bg-background sticky bottom-0">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={!canSubmit}>
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
