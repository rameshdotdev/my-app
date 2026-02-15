/**
 * Integration example showing how todo persistence works
 * This file demonstrates the complete workflow
 */

// ============================================================================
// EXAMPLE 1: Basic Usage in a Component
// ============================================================================

import { useTodoActions } from "@/hooks/use-todo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function TodoExample() {
  const { addTask, toggleTask, deleteTask, error, lastSavedAt } = useTodoActions();
  const { categories } = useSelector((state: RootState) => state.todo);

  // Get first category for example
  const firstCategory = categories[0];

  const handleAddNewTask = () => {
    const success = addTask(firstCategory.id, "Learn Redux Persist");
    if (success) {
      console.log("Task added! It's automatically saving to localStorage");
    }
  };

  const handleToggleFirstTask = () => {
    if (firstCategory.tasks.length > 0) {
      toggleTask(firstCategory.id, firstCategory.tasks[0].id);
    }
  };

  return (
    <div>
      <button onClick={handleAddNewTask}>Add Task</button>
      <button onClick={handleToggleFirstTask}>Toggle First Task</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {lastSavedAt && (
        <p>Last saved: {new Date(lastSavedAt).toLocaleTimeString()}</p>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Storage Utilities Usage
// ============================================================================

import { useTodoStorage } from "@/hooks/use-todo-storage";
import { toast } from "sonner";

export function TodoSettingsExample() {
  const { stats, storageUsage, export: exportData, import: importData, clear } = useTodoStorage();

  const handleExport = () => {
    if (exportData()) {
      toast.success("Todo data exported successfully");
    } else {
      toast.error("Export failed");
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (await importData(file)) {
      toast.success("Todo data imported successfully");
    } else {
      toast.error("Import failed");
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure? This will delete all todo data.")) {
      clear();
      toast.success("All todo data cleared");
    }
  };

  return (
    <div>
      <h2>Todo Settings</h2>
      {stats && (
        <div>
          <p>Total Tasks: {stats.totalTasks}</p>
          <p>Completed: {stats.completedTasks}</p>
          <p>Remaining: {stats.incompleteTasks}</p>
        </div>
      )}
      {storageUsage && (
        <p>
          Storage used: {(storageUsage.used / 1024).toFixed(2)} KB
          ({storageUsage.percentageOfEstimated.toFixed(1)}% of quota)
        </p>
      )}
      <button onClick={handleExport}>Export Data</button>
      <input type="file" accept=".json" onChange={handleImport} />
      <button onClick={handleClear}>Clear All Data</button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: What Happens Automatically
// ============================================================================

/**
 * Timeline of events when user adds a task:
 *
 * 1. User clicks "Add Task" button
 * 2. addTask() action is dispatched
 * 3. Redux Toolkit updates state in memory
 * 4. Component re-renders with new data
 * 5. Redux Persist middleware intercepts the state change
 * 6. New state is serialized to JSON
 * 7. Data written to localStorage (non-blocking)
 * 8. lastSavedAt timestamp updated
 * 9. Toast notification shows "Changes saved"
 *
 * On page refresh:
 * 1. Redux Persist reads data from localStorage
 * 2. State is hydrated BEFORE component renders
 * 3. PersistGate prevents rendering until hydration complete
 * 4. User sees their tasks as if page never refreshed
 * 5. New Redux Persist middleware listens for further changes
 */

// ============================================================================
// EXAMPLE 4: Debugging in Browser Console
// ============================================================================

/**
 * Open browser console and try these commands:
 *
 * // View todo data
 * localStorage.getItem('__APER__root')
 *
 * // Parse and view as object
 * JSON.parse(localStorage.getItem('__APER__root')).todo
 *
 * // Get todos only
 * JSON.parse(localStorage.getItem('__APER__root')).todo.categories
 *
 * // See file size
 * new Blob([localStorage.getItem('__APER__root')]).size + ' bytes'
 *
 * // Clear data (for recovery)
 * localStorage.removeItem('__APER__root')
 * location.reload()
 */

// ============================================================================
// EXAMPLE 5: Cross-Tab Synchronization
// ============================================================================

/**
 * If user opens your app in two tabs:
 *
 * Tab 1: User adds a task
 * → State changes + saved to localStorage
 * → Storage event fires on Tab 2
 * → Tab 2 receives the new state automatically
 * → Both tabs stay in sync without API calls
 *
 * This happens via the setupStorageSync() function
 * in the useTodoStorage hook.
 */

// ============================================================================
// EXAMPLE 6: Error Handling
// ============================================================================

/**
 * Errors are handled automatically:
 *
 * const { addTask, error } = useTodoActions();
 *
 * // If this fails for any reason:
 * addTask(categoryId, "New Task");
 *
 * // The slice catches it:
 * // 1. Sets state.error to error message
 * // 2. Logs to console
 * // 3. Hook detects error change
 * // 4. Toast notification shown
 * // 5. Auto-clears after 5 seconds
 */

// ============================================================================
// EXAMPLE 7: Checking if Storage is Available
// ============================================================================

import { isStorageAvailable } from "@/lib/todo-storage-utils";

export function CheckStorageExample() {
  const canUseStorage = isStorageAvailable();

  return (
    <div>
      {canUseStorage ? (
        <p>✓ Local storage is available. Your changes will be saved.</p>
      ) : (
        <p>
          ⚠ Local storage is not available. Changes won't persist. You might be
          in private mode.
        </p>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Complete Flow Diagram
// ============================================================================

/**
 * User Action Flow:
 *
 *                    ┌─────────────────────┐
 *                    │   User Adds Task    │
 *                    └──────────┬──────────┘
 *                               │
 *                    ┌──────────▼──────────┐
 *                    │  useTodoActions()   │
 *                    │  dispatch(addTask)  │
 *                    └──────────┬──────────┘
 *                               │
 *                    ┌──────────▼──────────┐
 *                    │   Redux Reducer     │
 *                    │  Updates state[]    │
 *                    └──────────┬──────────┘
 *                               │
 *                    ┌──────────▼──────────┐
 *                    │ Redux-Persist       │
 *                    │ Middleware          │
 *                    └──────────┬──────────┘
 *                               │
 *                    ┌──────────▼──────────┐
 *                    │ Write to localStorage
 *                    │ ("__APER__root")    │
 *                    └──────────┬──────────┘
 *                               │
 *                    ┌──────────▼──────────┐
 *                    │  Component Renders  │
 *                    │  Toast Notification │
 *                    └─────────────────────┘
 */

// ============================================================================
// EXAMPLE 9: Testing Recovery
// ============================================================================

/**
 * To test that persistence works:
 *
 * 1. Go to /dashboard/todo
 * 2. Add several tasks and categories
 * 3. Verify in DevTools > Application > localStorage
 * 4. Close the browser tab completely
 * 5. Reopen the page at /dashboard/todo
 * 6. All your tasks should still be there!
 *
 * If they're not, check:
 * - Browser is not in private/incognito mode
 * - localStorage is enabled in browser settings
 * - No browser extensions blocking localStorage
 */

// ============================================================================
// EXAMPLE 10: Production Considerations
// ============================================================================

/**
 * localStorage limits:
 * - Chrome/Firefox: 5-10MB per domain
 * - Safari: 5MB
 * - IE: 10MB
 *
 * Typical todo app data:
 * - 100 categories with 50 tasks each = ~30KB
 * - 1000 tasks with long titles = ~100KB
 *
 * For larger datasets, consider:
 * - Implementing IndexedDB instead
 * - Using backend API sync
 * - Compressing data before storage
 * - Archiving old/completed tasks
 *
 * Current implementation uses:
 * - Whitelist strategy (only essential fields persisted)
 * - Automatic error recovery
 * - Cross-tab sync for consistency
 */

export {};
