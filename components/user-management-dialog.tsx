"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AuthResponse } from "@/types/type";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser } from "@/store/features/userSlice";

export default function UserManagementDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AuthResponse;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<{
    url?: string | null;
    publicId?: string | null;
  } | null>(
    user?.avatar
      ? { url: user.avatar.url, publicId: user.avatar.publicId }
      : null,
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleAvatar = async (file?: File) => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await uploadToCloudinary(file);
      setAvatar({ url: data.secure_url ?? data.url, publicId: data.public_id });
      toast.success("Avatar uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Avatar upload failed");
    } finally {
      setLoading(false);
    }
  };

  // --- handleSave (PATCH /api/auth/me, send avatar object {url, publicId}) ---
  const handleSave = async () => {
    setLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        email: email.trim(),
        avatar:
          avatar && avatar.url && avatar.publicId
            ? { url: avatar.url, publicId: avatar.publicId }
            : null,
      };

      if (currentPassword || newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const user = await api.patch("/auth/me", payload);
      dispatch(setUser(user.data));
      toast.success("Profile saved");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage account</DialogTitle>
          <DialogDescription>
            Update name, email, avatar and password.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={avatar?.url ?? undefined}
                alt={name || "User"}
              />
              <AvatarFallback>
                {(name || "U").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Label className="mb-1 block">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <Label className="mb-1 mt-3 block">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Avatar</Label>
            <div className="flex items-center gap-2">
              <input
                id="avatar-file"
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatar(e.target.files?.[0])}
                className="hidden"
              />
              <label htmlFor="avatar-file">
                <Button size="sm" asChild>
                  <span>Upload avatar</span>
                </Button>
              </label>
              <span className="text-sm text-muted-foreground">
                PNG, JPG &lt; 2MB
              </span>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">Change password</Label>
            <div className="grid gap-2 md:grid-cols-2">
              <Input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
