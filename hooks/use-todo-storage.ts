import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getTodoStateFromStorage,
  clearTodoStorage,
  exportTodoData,
  importTodoData,
  getTodoStats,
  isStorageAvailable,
  getStorageUsage,
  setupStorageSync,
} from "@/lib/todo-storage-utils";
import { initializeState } from "@/store/features/todoSlice";

/**
 * Hook for managing todo storage operations
 * Provides utilities for backup, restore, and cross-tab synchronization
 */
export const useTodoStorage = () => {
  const dispatch = useDispatch();
  const todoState = useSelector((state: RootState) => state.todo);
  const [storageAvailable, setStorageAvailable] = useState(false);
  const [stats, setStats] = useState<ReturnType<typeof getTodoStats>>(null);
  const [storageUsage, setStorageUsage] = useState<ReturnType<typeof getStorageUsage>>(null);

  // Check storage availability on mount
  useEffect(() => {
    setStorageAvailable(isStorageAvailable());
    updateStats();
    updateStorageUsage();
  }, []);

  // Setup cross-tab synchronization
  useEffect(() => {
    if (!storageAvailable) return;

    const cleanup = setupStorageSync((state) => {
      if (state) {
        dispatch(initializeState(state));
        updateStats();
      }
    });

    return cleanup;
  }, [storageAvailable, dispatch]);

  const updateStats = useCallback(() => {
    const newStats = getTodoStats();
    setStats(newStats);
  }, []);

  const updateStorageUsage = useCallback(() => {
    const usage = getStorageUsage();
    setStorageUsage(usage);
  }, []);

  const handleExport = useCallback(() => {
    try {
      exportTodoData();
      return true;
    } catch (error) {
      console.error("Export failed:", error);
      return false;
    }
  }, []);

  const handleImport = useCallback(
    async (file: File) => {
      try {
        const importedState = await importTodoData(file);
        dispatch(initializeState(importedState));
        updateStats();
        updateStorageUsage();
        return true;
      } catch (error) {
        console.error("Import failed:", error);
        return false;
      }
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    clearTodoStorage();
    updateStats();
    updateStorageUsage();
  }, []);

  return {
    storageAvailable,
    stats,
    storageUsage,
    export: handleExport,
    import: handleImport,
    clear: handleClear,
    refreshStats: updateStats,
    refreshUsage: updateStorageUsage,
  };
};
