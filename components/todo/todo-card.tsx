"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Task, TodoCategory } from "@/store/features/todoSlice";
import { useTodoActions } from "@/hooks/use-todo";
import { TaskFormModal } from "./task-form-modal";
import { SwipeableTaskItem } from "./swipeable-task-item";

type Props = TodoCategory;

export function TodoCard({ id: categoryId, title, color, tasks }: Props) {
  const { deleteTask, addTask, toggleTask, updateTaskTitle } = useTodoActions();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleToggleTask = (taskId: string) => {
    if (toggleTask(categoryId, taskId)) {
      toast.success("Task updated");
    } else {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (deleteTask(categoryId, taskId)) {
      toast.success("Task deleted");
    } else {
      toast.error("Failed to delete task");
    }
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (taskTitle: string) => {
    if (editingTask) {
      // Update task
      if (updateTaskTitle(categoryId, editingTask.id, taskTitle)) {
        toast.success("Task updated");
        setEditingTask(null);
      } else {
        toast.error("Failed to update task");
        throw new Error("Failed to update task");
      }
    } else {
      // Add task
      if (addTask(categoryId, taskTitle)) {
        toast.success("Task added");
      } else {
        toast.error("Failed to add task");
        throw new Error("Failed to add task");
      }
    }
  };

  return (
    <Card className="rounded-2xl border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <h2 className="flex-1 font-medium">{title}</h2>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <SwipeableTaskItem
            key={task.id}
            task={task}
            onToggle={() => handleToggleTask(task.id)}
            onEdit={() => handleOpenEditModal(task)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenAddModal}
          className="w-full text-xs text-muted-foreground hover:text-foreground mt-2"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add task
        </Button>
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        open={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        task={editingTask}
        categoryTitle={title}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingTask(null)}
      />
    </Card>
  );
}
