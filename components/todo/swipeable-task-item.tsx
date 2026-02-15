"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, RotateCcw, X } from "lucide-react";
import { Task } from "@/store/features/todoSlice";
import { toast } from "sonner";

interface SwipeableTaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isEditing?: boolean;
}

type SwipeState = "idle" | "swiped" | "deleted";

export function SwipeableTaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  isEditing = false,
}: SwipeableTaskItemProps) {
  const [swipeState, setSwipeState] = useState<SwipeState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // Handle drag start
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isEditing || swipeState === "deleted") return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
  };

  // Handle drag move
  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isEditing || swipeState === "deleted") return;
    dragCurrentX.current = e.clientX;
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const delta = dragStartX.current - dragCurrentX.current;
    const threshold = 100; // Minimum swipe distance (pixels)

    // Swipe left to delete
    if (delta > threshold) {
      setSwipeState("swiped");
      return;
    }

    // Reset if swiped right or not enough distance
    dragStartX.current = 0;
    dragCurrentX.current = 0;
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    setSwipeState("deleted");
    onDelete(task.id);
    
    // Optional: Show toast
    toast.success("Task deleted", {
      description: "Swipe down to undo or close this notification",
      duration: 5000,
    });

    // Auto-revert after animation
    setTimeout(() => {
      setSwipeState("idle");
    }, 5000);
  };

  // Cancel swipe
  const handleCancelSwipe = () => {
    setSwipeState("idle");
    dragStartX.current = 0;
    dragCurrentX.current = 0;
  };

  // Render deleted state
  if (swipeState === "deleted") {
    return (
      <motion.div
        layoutId={task.id}
        initial={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-destructive">Task deleted</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSwipeState("idle");
              // Task will be restored via the undo mechanism
              toast.success("Task restored");
            }}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-3"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Undo
          </Button>
        </div>
      </motion.div>
    );
  }

  // Render swiped state (delete confirmation)
  if (swipeState === "swiped") {
    return (
      <motion.div
        layoutId={task.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex gap-2"
      >
        <motion.div
          className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-lg border border-border"
          layout
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
          />
          <span
            className={`flex-1 text-sm cursor-pointer hover:underline transition-colors ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
            onClick={() => onEdit(task)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onEdit(task);
              }
            }}
          >
            {task.title}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            title="Edit task"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
        </motion.div>

        {/* Delete confirmation buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelSwipe}
            className="h-10 px-3"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleConfirmDelete}
            className="h-10 px-3"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Render normal state
  return (
    <motion.div
      layoutId={task.id}
      ref={containerRef}
      onPointerDown={handleDragStart}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerLeave={handleDragEnd}
      drag="x"
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(event, info) => {
        const threshold = 100;
        if (info.offset.x < -threshold) {
          setSwipeState("swiped");
        }
        dragStartX.current = 0;
        dragCurrentX.current = 0;
      }}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
      whileDrag={{ cursor: "grabbing" }}
      className="group relative flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 transition-all hover:bg-card cursor-grab active:cursor-grabbing"
    >
      {/* Drag indicator - appears on swipe */}
      <motion.div
        className="absolute inset-y-0 right-full flex items-center justify-end pr-4 text-destructive"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: isDragging ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Trash2 className="h-4 w-4" />
      </motion.div>

      {/* Task content */}
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
      />
      <span
        className={`flex-1 text-sm cursor-pointer hover:underline transition-colors ${
          task.completed ? "line-through text-muted-foreground" : ""
        }`}
        onClick={() => onEdit(task)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onEdit(task);
          }
        }}
      >
        {task.title}
      </span>

      {/* Action buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="h-6 w-6 p-0"
          aria-label={`Edit ${task.title}`}
          title="Edit task"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSwipeState("swiped")}
          className="h-6 w-6 p-0"
          aria-label={`Delete ${task.title}`}
          title="Delete task (or swipe left)"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Swipe hint on mobile */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 rounded-lg"
        animate={{
          opacity: isDragging ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs text-muted-foreground font-medium">Swipe to delete</span>
      </motion.div>
    </motion.div>
  );
}
