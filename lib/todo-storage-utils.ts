/**
 * Utility functions for todo data management and error recovery
 */

import { TodoState, TodoCategory, Task } from "@/store/features/todoSlice";

const STORAGE_KEY = "__APER__root";
const TODO_STATE_KEY = "todo";

/**
 * Safely retrieve todo state from localStorage
 * Returns null if data is corrupted or missing
 */
export const getTodoStateFromStorage = (): TodoState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    return parsed?.[TODO_STATE_KEY] || null;
  } catch (error) {
    console.error("Error reading todo state from localStorage:", error);
    return null;
  }
};

/**
 * Clear todo data from localStorage for recovery
 */
export const clearTodoStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("Todo storage cleared successfully");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Export todo data as JSON for backup
 */
export const exportTodoData = (fileName?: string): void => {
  try {
    const state = getTodoStateFromStorage();
    if (!state) {
      console.warn("No todo data to export");
      return;
    }

    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || `todo-backup-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting todo data:", error);
    throw new Error("Failed to export todo data");
  }
};

/**
 * Import todo data from JSON file
 */
export const importTodoData = (file: File): Promise<TodoState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content) as TodoState;

        // Validate state structure
        if (!data.categories || !Array.isArray(data.categories)) {
          reject(new Error("Invalid todo data format"));
          return;
        }

        resolve(data);
      } catch (error) {
        reject(new Error("Failed to parse todo data file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Validate todo state structure
 */
export const validateTodoState = (state: unknown): state is TodoState => {
  if (!state || typeof state !== "object") return false;

  const todoState = state as Record<string, unknown>;

  if (!Array.isArray(todoState.categories)) return false;

  return todoState.categories.every((cat) => {
    if (typeof cat !== "object" || !cat) return false;
    const category = cat as Record<string, unknown>;

    return (
      typeof category.id === "string" &&
      typeof category.title === "string" &&
      typeof category.color === "string" &&
      Array.isArray(category.tasks) &&
      category.tasks.every((task) => {
        if (typeof task !== "object" || !task) return false;
        const t = task as Record<string, unknown>;
        return (
          typeof t.id === "string" &&
          typeof t.title === "string" &&
          typeof t.completed === "boolean"
        );
      })
    );
  });
};

/**
 * Get statistics about todo data
 */
export const getTodoStats = (): {
  totalCategories: number;
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  emptyCategories: number;
} | null => {
  const state = getTodoStateFromStorage();
  if (!state) return null;

  const stats = state.categories.reduce(
    (acc, category) => ({
      totalCategories: acc.totalCategories + 1,
      totalTasks: acc.totalTasks + category.tasks.length,
      completedTasks:
        acc.completedTasks + category.tasks.filter((t) => t.completed).length,
      incompleteTasks:
        acc.incompleteTasks + category.tasks.filter((t) => !t.completed).length,
      emptyCategories:
        acc.emptyCategories + (category.tasks.length === 0 ? 1 : 0),
    }),
    { totalCategories: 0, totalTasks: 0, completedTasks: 0, incompleteTasks: 0, emptyCategories: 0 }
  );

  return stats;
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get storage usage information
 */
export const getStorageUsage = (): {
  used: number;
  percentageOfEstimated: number;
} | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const sizeInBytes = new Blob([data]).size;
    const estimatedQuota = 5 * 1024 * 1024; // 5MB typical limit

    return {
      used: sizeInBytes,
      percentageOfEstimated: (sizeInBytes / estimatedQuota) * 100,
    };
  } catch {
    return null;
  }
};

/**
 * Migrate todo data from old format (if needed in future)
 */
export const migrateTodoData = (oldState: any): TodoState => {
  // This function can be used to upgrade old data formats
  // Currently returns the state as-is
  return oldState;
};

/**
 * Sync todo data across browser tabs (using storage events)
 */
export const setupStorageSync = (callback: (state: TodoState | null) => void): (() => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        callback(parsed[TODO_STATE_KEY] || null);
      } catch (error) {
        console.error("Error syncing storage across tabs:", error);
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};
