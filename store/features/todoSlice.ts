import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoCategory {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  createdAt: number;
}

export interface TodoState {
  categories: TodoCategory[];
  error: string | null;
  lastSavedAt: number | null;
  isLoading: boolean;
}

const initialState: TodoState = {
  categories: [
    {
      id: uuidv4(),
      title: "Home",
      color: "bg-yellow-500",
      tasks: [],
      createdAt: Date.now(),
    },
    {
      id: uuidv4(),
      title: "Work",
      color: "bg-green-500",
      tasks: [],
      createdAt: Date.now(),
    },
    {
      id: uuidv4(),
      title: "School",
      color: "bg-red-500",
      tasks: [],
      createdAt: Date.now(),
    },
  ],
  error: null,
  lastSavedAt: null,
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add a new task to a category
    addTask: {
      reducer: (
        state,
        action: PayloadAction<{ categoryId: string; title: string }>
      ) => {
        const category = state.categories.find((c) => c.id === action.payload.categoryId);
        if (category) {
          category.tasks.push({
            id: uuidv4(),
            title: action.payload.title,
            completed: false,
          });
          state.lastSavedAt = Date.now();
          state.error = null;
        } else {
          state.error = "Category not found";
        }
      },
      prepare: (payload: { categoryId: string; title: string }) => ({
        payload,
      }),
    },

    // Toggle task completion status
    toggleTask: (
      state,
      action: PayloadAction<{ categoryId: string; taskId: string }>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (category) {
        const task = category.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.completed = !task.completed;
          state.lastSavedAt = Date.now();
          state.error = null;
        } else {
          state.error = "Task not found";
        }
      } else {
        state.error = "Category not found";
      }
    },

    // Delete a task
    deleteTask: (
      state,
      action: PayloadAction<{ categoryId: string; taskId: string }>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (category) {
        category.tasks = category.tasks.filter(
          (t) => t.id !== action.payload.taskId
        );
        state.lastSavedAt = Date.now();
        state.error = null;
      } else {
        state.error = "Category not found";
      }
    },

    // Add a new category
    addCategory: (
      state,
      action: PayloadAction<{ title: string; color: string }>
    ) => {
      state.categories.push({
        id: uuidv4(),
        title: action.payload.title,
        color: action.payload.color,
        tasks: [],
        createdAt: Date.now(),
      });
      state.lastSavedAt = Date.now();
      state.error = null;
    },

    // Delete a category
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
      state.lastSavedAt = Date.now();
      state.error = null;
    },

    // Update task title
    updateTaskTitle: (
      state,
      action: PayloadAction<{
        categoryId: string;
        taskId: string;
        title: string;
      }>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (category) {
        const task = category.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.title = action.payload.title;
          state.lastSavedAt = Date.now();
          state.error = null;
        } else {
          state.error = "Task not found";
        }
      } else {
        state.error = "Category not found";
      }
    },

    // Clear all completed tasks in a category
    clearCompletedTasks: (state, action: PayloadAction<string>) => {
      const category = state.categories.find((c) => c.id === action.payload);
      if (category) {
        category.tasks = category.tasks.filter((t) => !t.completed);
        state.lastSavedAt = Date.now();
        state.error = null;
      } else {
        state.error = "Category not found";
      }
    },

    // Clear all tasks in a category
    clearAllTasks: (state, action: PayloadAction<string>) => {
      const category = state.categories.find((c) => c.id === action.payload);
      if (category) {
        category.tasks = [];
        state.lastSavedAt = Date.now();
        state.error = null;
      } else {
        state.error = "Category not found";
      }
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Initialize state from localStorage (called by middleware)
    initializeState: (state, action: PayloadAction<TodoState | null>) => {
      if (action.payload) {
        return action.payload;
      }
      return state;
    },
  },
});

export const {
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
  setLoading,
  initializeState,
} = todoSlice.actions;

export default todoSlice.reducer;
