/**
 * Type definitions for the todo persistence system
 */

/**
 * Represents a single task within a category
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * Represents a todo category with multiple tasks
 */
export interface TodoCategory {
  id: string;
  title: string;
  color: string; // CSS class name (e.g., 'bg-red-500')
  tasks: Task[];
  createdAt: number; // Unix timestamp
}

/**
 * Complete todo state shape
 */
export interface TodoState {
  categories: TodoCategory[];
  error: string | null;
  lastSavedAt: number | null; // Unix timestamp
  isLoading: boolean;
}

/**
 * Action payloads for todo operations
 */
export namespace TodoActions {
  export interface AddTaskPayload {
    categoryId: string;
    title: string;
  }

  export interface ToggleTaskPayload {
    categoryId: string;
    taskId: string;
  }

  export interface DeleteTaskPayload {
    categoryId: string;
    taskId: string;
  }

  export interface AddCategoryPayload {
    title: string;
    color: string;
  }

  export interface UpdateTaskTitlePayload {
    categoryId: string;
    taskId: string;
    title: string;
  }
}

/**
 * Statistics about todo data
 */
export interface TodoStats {
  totalCategories: number;
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  emptyCategories: number;
}

/**
 * Storage usage information
 */
export interface StorageUsageInfo {
  used: number; // bytes
  percentageOfEstimated: number; // 0-100
}

/**
 * Redux dispatch helper type
 */
export type TodoActionTypes =
  | { type: "todo/addTask"; payload: TodoActions.AddTaskPayload }
  | { type: "todo/toggleTask"; payload: TodoActions.ToggleTaskPayload }
  | { type: "todo/deleteTask"; payload: TodoActions.DeleteTaskPayload }
  | { type: "todo/addCategory"; payload: TodoActions.AddCategoryPayload }
  | { type: "todo/deleteCategory"; payload: string }
  | {
      type: "todo/updateTaskTitle";
      payload: TodoActions.UpdateTaskTitlePayload;
    }
  | { type: "todo/clearCompletedTasks"; payload: string }
  | { type: "todo/clearAllTasks"; payload: string }
  | { type: "todo/setError"; payload: string | null }
  | { type: "todo/clearError" }
  | { type: "todo/setLoading"; payload: boolean }
  | { type: "todo/initializeState"; payload: TodoState | null };
