"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Task } from "@/store/features/todoSlice";

interface TaskFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  categoryTitle: string;
  onSubmit: (title: string) => void;
  onCancel?: () => void;
}

interface FormErrors {
  title?: string;
}

export function TaskFormModal({
  open,
  onOpenChange,
  task,
  categoryTitle,
  onSubmit,
  onCancel,
}: TaskFormModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTitle(task?.title || "");
      setErrors({});
      setIsSubmitting(false);
      onCancel?.();
    }
    onOpenChange(newOpen);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Task title is required";
    } else if (title.trim().length < 2) {
      newErrors.title = "Task title must be at least 2 characters";
    } else if (title.trim().length > 100) {
      newErrors.title = "Task title must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit(title.trim());
      // Close modal on success
      handleOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ title: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Submit on Enter (except on mobile)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
    // Clear on Escape
    if (e.key === "Escape") {
      e.preventDefault();
      handleOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-96 sm:max-w-lg sm:rounded-lg">
        <SheetHeader className="mb-6 pt-2">
          <SheetTitle className="text-xl font-semibold">
            {task ? "Edit Task" : "Add Task"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              in {categoryTitle}
            </span>
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="task-title" className="text-base font-medium">
              Task Title
            </Label>
            <div className="relative">
              <Input
                id="task-title"
                type="text"
                placeholder={task ? "Update task..." : "Enter task name..."}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  // Clear error when user starts typing
                  if (errors.title) {
                    setErrors({});
                  }
                }}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                autoFocus
                maxLength={100}
                className="pr-10 text-base h-12 rounded-xl border-2 border-input transition-all focus:border-primary"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {/* Character count */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                {title.length}/100
              </span>
            </div>

            {/* Error message */}
            {errors.title && (
              <div
                id="title-error"
                className="flex items-center gap-2 text-sm text-destructive animate-in fade-in slide-in-from-top-2"
              >
                <div className="w-1 h-1 rounded-full bg-destructive" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-3 pt-4 pb-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-12 rounded-xl font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="flex-1 h-12 rounded-xl font-medium"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  {task ? "Updating..." : "Adding..."}
                </>
              ) : task ? (
                "Update Task"
              ) : (
                "Add Task"
              )}
            </Button>
          </div>

          {/* Keyboard hint for mobile */}
          <div className="text-center text-xs text-muted-foreground pt-2 sm:hidden">
            <p>💡 Press Enter to submit, Esc to cancel</p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
