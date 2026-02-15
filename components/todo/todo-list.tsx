"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoCard } from "./todo-card";
import { EmptyState } from "./empty-state";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTodoActions } from "@/hooks/use-todo";

const COLORS = [
  "bg-yellow-500",
  "bg-green-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
];

export function TodoList() {
  const { categories, error, isLoading, lastSavedAt } = useSelector(
    (state: RootState) => state.todo,
  );
  const { addCategory } = useTodoActions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Show error notification when error changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        description: "Action failed. Please try again.",
      });
    }
  }, [error]);

  // Show save notification
  useEffect(() => {
    if (lastSavedAt) {
      const lastSavedDate = new Date(lastSavedAt);
      const now = new Date();
      if (now.getTime() - lastSavedDate.getTime() < 1000) {
        toast.success("Changes saved to local storage", {
          duration: 2000,
        });
      }
    }
  }, [lastSavedAt]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    if (addCategory(newCategoryName, selectedColor)) {
      setNewCategoryName("");
      setSelectedColor(COLORS[0]);
      setIsAddDialogOpen(false);
      toast.success("Category added successfully");
    } else {
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="relative mx-auto max-w-md space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Tasks</h1>
        {isLoading && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Saving...
          </span>
        )}
        {lastSavedAt && !isLoading && (
          <span className="text-xs text-muted-foreground">Saved</span>
        )}
      </header>

      {categories.length > 0 ? (
        categories.map((item) => <TodoCard key={item.id} {...item} />)
      ) : (
        <EmptyState />
      )}

      {/* Floating Action Button */}
      <Button
        size="icon"
        onClick={() => setIsAddDialogOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        aria-label="Add new category"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category Name</label>
              <Input
                placeholder="Enter category name (e.g., Personal, Work)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory();
                  }
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full ${color} transition-transform ${
                      selectedColor === color
                        ? "scale-110 ring-2 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
