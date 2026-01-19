"use client";

import { useEffect, useState } from "react";
import { Work } from "@/types/work";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks/hooks";
import { addWork, updateWork } from "@/store/features/workSlice";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

type ImageState = {
  url: string;
  publicId: string;
};

const LOCATION_TYPES = ["Remote", "Onsite", "Hybrid"] as const;
const JOB_TYPES = ["Full Time", "Part Time", "Internship"] as const;

type Props = {
  setOpenAction: (v: boolean) => void;
  open: boolean;
  initialData: Work | null;
};

export default function WorkFormDialog({
  open,
  setOpenAction,
  initialData,
}: Props) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Partial<Work>>({});
  const [logo, setLogo] = useState<ImageState | null>(null);

  // tags input
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // points input
  const [pointsText, setPointsText] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* =========================
     Hydrate on Edit
  ========================= */
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setLogo(initialData.logoUrl ?? null);
      setTags(initialData.tags ?? []);
      setPointsText((initialData.points ?? []).join("\n"));
    } else {
      setForm({});
      setLogo(null);
      setTags([]);
      setPointsText("");
    }
  }, [initialData]);

  /* =========================
     Logo Upload (REQUIRED)
  ========================= */
  const handleLogoChange = async (file: File) => {
    try {
      setUploading(true);
      const res = await uploadToCloudinary(file);

      setLogo({
        url: res.secure_url,
        publicId: res.public_id,
      });

      toast.success("Logo uploaded");
    } catch {
      toast.error("Logo upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     Tags Handling
  ========================= */
  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;

    setTags((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  /* =========================
     Submit (Redux + API)
  ========================= */
  const submit = async () => {
    if (!logo) {
      toast.error("Company logo is required");
      return;
    }

    if (
      !form.company ||
      !form.role ||
      !form.location ||
      !form.location_type ||
      !form.start ||
      !form.end
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const points = pointsText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    if (points.length === 0) {
      toast.error("Please add at least 1 point");
      return;
    }

    const payload = {
      ...form,
      tags,
      points,
      logoUrl: logo,
    };

    try {
      setSaving(true);

      if (form._id) {
        const res = await api.put(`/works-at/${form._id}`, payload);
        dispatch(updateWork(res.data));
        toast.success("Work updated");
      } else {
        const res = await api.post("/works-at", payload);
        dispatch(addWork(res.data));
        toast.success("Work created");
      }

      setOpenAction(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{form._id ? "Edit Work" : "Add Work"}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] no-scrollbar">
          <div className="space-y-4 pr-2">
            {/* Company */}
            <Input
              placeholder="Company *"
              value={form.company ?? ""}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />

            {/* Role */}
            <Input
              placeholder="Role *"
              value={form.role ?? ""}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            {/* Job Type */}
            <Select
              value={form.type}
              onValueChange={(v) =>
                setForm({ ...form, type: v as Work["type"] })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Job Type (optional)" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Website */}
            <Input
              placeholder="Company URL (optional)"
              value={form.href ?? ""}
              onChange={(e) => setForm({ ...form, href: e.target.value })}
            />

            {/* Location Type*/}
            <Select
              value={form.location_type}
              onValueChange={(v) =>
                setForm({ ...form, location_type: v as Work["location_type"] })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Location Type*" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_TYPES.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Location*/}
            <Input
              placeholder="Delhi India"
              value={form.location ?? ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            {/* Start / End */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Start (e.g. Aug 2025) *"
                value={form.start ?? ""}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
              <Input
                placeholder="End (e.g. Present) *"
                value={form.end ?? ""}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
            </div>

            {/* Points */}
            <Textarea
              placeholder={`Points * (one per line)\nExample:\nBuilt X\nImproved Y`}
              value={pointsText}
              onChange={(e) => setPointsText(e.target.value)}
              className="min-h-[140px]"
            />

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <span onClick={() => removeTag(tag)}>
                      <X className="ml-1 h-3 w-3 cursor-pointer" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Logo *</label>

              <Input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) =>
                  e.target.files?.[0] && handleLogoChange(e.target.files[0])
                }
              />

              {logo && (
                <Image
                  width={64}
                  height={64}
                  src={logo.url}
                  alt="Logo preview"
                  className="rounded-md border border-border object-contain"
                />
              )}
            </div>

            <Button
              className="w-full"
              onClick={submit}
              disabled={uploading || saving}
            >
              {saving ? "Saving..." : form._id ? "Update Work" : "Create Work"}
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
