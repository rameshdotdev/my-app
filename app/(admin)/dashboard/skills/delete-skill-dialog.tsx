"use client";

import { Skill } from "@/types/type";
import { api } from "@/lib/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteSkillDialog({
  open,
  skill,
  onClose,
  onSuccess,
}: {
  open: boolean;
  skill: Skill | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const handleDelete = async () => {
    await api.delete(`/skills/${skill!._id}`);
    onSuccess();
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “{skill?.name}”?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
