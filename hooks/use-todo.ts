import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { MutableRefObject, useEffect, useCallback } from "react";
import {
  addTask,
  toggleTask,
  deleteTask,
  addCategory,
  deleteCategory,
  updateTaskTitle,
  clearCompletedTasks,
  clearAllTasks,
  setError,
  clearError,
} from "@/store/features/todoSlice";

/**
 * Custom hook for managing todo operations
 * Provides dispatch wrappers with error handling for all todo actions
 */
export const useTodoActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.todo.error);
  const lastSavedAt = useSelector((state: RootState) => state.todo.lastSavedAt);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAddTask = useCallback(
    (categoryId: string, title: string) => {
      try {
        dispatch(addTask({ categoryId, title }));
        return true;
      } catch (err) {
        dispatch(setError("Failed to add task"));
        console.error("Error adding task:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleToggleTask = useCallback(
    (categoryId: string, taskId: string) => {
      try {
        dispatch(toggleTask({ categoryId, taskId }));
        return true;
      } catch (err) {
        dispatch(setError("Failed to toggle task"));
        console.error("Error toggling task:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (categoryId: string, taskId: string) => {
      try {
        dispatch(deleteTask({ categoryId, taskId }));
        return true;
      } catch (err) {
        dispatch(setError("Failed to delete task"));
        console.error("Error deleting task:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleAddCategory = useCallback(
    (title: string, color: string) => {
      try {
        dispatch(addCategory({ title, color }));
        return true;
      } catch (err) {
        dispatch(setError("Failed to add category"));
        console.error("Error adding category:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      try {
        dispatch(deleteCategory(categoryId));
        return true;
      } catch (err) {
        dispatch(setError("Failed to delete category"));
        console.error("Error deleting category:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleUpdateTaskTitle = useCallback(
    (categoryId: string, taskId: string, title: string) => {
      try {
        dispatch(updateTaskTitle({ categoryId, taskId, title }));
        return true;
      } catch (err) {
        dispatch(setError("Failed to update task"));
        console.error("Error updating task:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleClearCompletedTasks = useCallback(
    (categoryId: string) => {
      try {
        dispatch(clearCompletedTasks(categoryId));
        return true;
      } catch (err) {
        dispatch(setError("Failed to clear completed tasks"));
        console.error("Error clearing completed tasks:", err);
        return false;
      }
    },
    [dispatch]
  );

  const handleClearAllTasks = useCallback(
    (categoryId: string) => {
      try {
        dispatch(clearAllTasks(categoryId));
        return true;
      } catch (err) {
        dispatch(setError("Failed to clear all tasks"));
        console.error("Error clearing all tasks:", err);
        return false;
      }
    },
    [dispatch]
  );

  return {
    addTask: handleAddTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    addCategory: handleAddCategory,
    deleteCategory: handleDeleteCategory,
    updateTaskTitle: handleUpdateTaskTitle,
    clearCompletedTasks: handleClearCompletedTasks,
    clearAllTasks: handleClearAllTasks,
    error,
    lastSavedAt,
  };
};
