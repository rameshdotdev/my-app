# Architecture Diagram - Todo Persistence System

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER ENVIRONMENT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               React Components (UI)                       │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  <TodoList />        <TodoCard />                  │  │  │
│  │  │  - Render categories - CRUD operations            │  │  │
│  │  │  - Show stats        - Inline editing             │  │  │
│  │  │  - Error display     - Task completion            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └───────────────────────┬──────────────────────────────────┘  │
│                          │ useDispatch()                        │
│                          │ useSelector()                        │
│                          ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Custom Hooks (Error Handling)                  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  useTodoActions()      useTodoStorage()           │  │  │
│  │  │  - addTask()           - export()                 │  │  │
│  │  │  - toggleTask()        - import()                 │  │  │
│  │  │  - deleteTask()        - clear()                  │  │  │
│  │  │  - error handling      - stats()                  │  │  │
│  │  │  - try/catch wraps     - usage info              │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └───────────────────────┬──────────────────────────────────┘  │
│                          │ dispatch(action)                    │
│                          ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Redux Store & Middleware                    │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Redux Store                                       │  │  │
│  │  │  ├─ user, theme, projects, ...                    │  │  │
│  │  │  └─ todo: {                                        │  │  │
│  │  │      categories: [],                              │  │  │
│  │  │      error: null,                                 │  │  │
│  │  │      lastSavedAt: null,                           │  │  │
│  │  │      isLoading: false                             │  │  │
│  │  │    }                                               │  │  │
│  │  └────────────┬─────────────────────────────────────┘  │  │
│  │               │                                          │  │
│  │  ┌────────────▼─────────────────────────────────────┐  │  │
│  │  │  Redux-Persist Middleware                        │  │  │
│  │  │  - Intercepts state changes                      │  │  │
│  │  │  - Whitelists categories & lastSavedAt           │  │  │
│  │  │  - Serializes to JSON                            │  │  │
│  │  │  - Writes to localStorage (non-blocking)         │  │  │
│  │  │  - Handles version migrations                    │  │  │
│  │  └────────────┬─────────────────────────────────────┘  │  │
│  │               │                                          │  │
│  │  ┌────────────▼─────────────────────────────────────┐  │  │
│  │  │  Reducers (todoSlice)                            │  │  │
│  │  │  - addTask()         - deleteTask()              │  │  │
│  │  │  - toggleTask()      - addCategory()             │  │  │
│  │  │  - updateTaskTitle() - clearCompletedTasks()     │  │  │
│  │  │  - setError()        - initializeState()         │  │  │
│  │  │                                                   │  │  │
│  │  │  All mutations tracked & validated               │  │  │
│  │  └────────────┬─────────────────────────────────────┘  │  │
│  └───────────────────────┬──────────────────────────────────┘  │
│                          │                                     │
│                          ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Browser APIs                                   │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  localStorage                                      │  │  │
│  │  │  Key: "__APER__root"                              │  │  │
│  │  │  Value: { todo: { categories: [...], ... } }     │  │  │
│  │  │  Size: ~30-100KB for typical app                  │  │  │
│  │  │  Limit: 5-10MB per domain                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Storage Events (Cross-Tab Sync)                  │  │  │
│  │  │  - Tab 1: writes to localStorage                  │  │  │
│  │  │  - Browser fires 'storage' event in Tab 2         │  │  │
│  │  │  - Tab 2: rehydrates state automatically          │  │  │
│  │  │  - Both tabs now in sync                          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│  User      │
│  Action    │
└──────┬──────┘
       │ (Click button, type text)
       │
       ▼
┌──────────────────────┐
│  React Handler       │
│  onClick={...}       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  useTodoActions Hook             │
│  - Wraps in try/catch            │
│  - Sets loading state            │
│  - Handles errors gracefully     │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  dispatch(addTask({             │
│    categoryId,                   │
│    title                         │
│  }))                             │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Redux Reducer                   │
│  Creates new Task object with:   │
│  - id: uuidv4()                  │
│  - title: payload.title          │
│  - completed: false              │
│  Sets lastSavedAt: Date.now()    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Redux State Updated             │
│  (in memory, fast)               │
└──────┬───────────────────────────┘
       │
       ├─────────────────────────────┐
       │ (Subscribers notified)      │
       │                             │
       ▼                             ▼
┌──────────────┐            ┌──────────────────┐
│  Component   │            │  Redux-Persist   │
│  Re-renders  │            │  Middleware      │
│  UI Updates  │            └───────┬──────────┘
│  Instantly   │                    │
└──────────────┘          ┌─────────▼──────────┐
                          │  Serialize State   │
                          │  JSON.stringify()  │
                          └─────────┬──────────┘
                                    │
                          ┌─────────▼──────────┐
                          │  Write to Browser  │
                          │  localStorage      │
                          │  Non-blocking      │
                          └─────────┬──────────┘
                                    │
                          ┌─────────▼──────────┐
                          │  Toast Notification│
                          │  "Task added"      │
                          └────────────────────┘
```

## State Shape Evolution

```
Initial State (on app load)
┌─────────────────────────────────┐
│ todo: {                         │
│   categories: [                 │
│     { id, title, color, ... }   │
│   ],                            │
│   error: null,                  │
│   lastSavedAt: null,            │
│   isLoading: false              │
│ }                               │
└─────────────────────────────────┘
          │
          │ (Redux-Persist loads from localStorage)
          │
          ▼
Hydrated State (from localStorage)
┌─────────────────────────────────┐
│ todo: {                         │
│   categories: [ ... ],          │
│   tasks: [ ... ],               │
│   error: null,  ← cleared       │
│   lastSavedAt: 1708929600000,   │
│   isLoading: false              │
│ }                               │
└─────────────────────────────────┘
          │
          │ (User action)
          │
          ▼
After Add Task
┌─────────────────────────────────┐
│ todo: {                         │
│   categories: [                 │
│     { tasks: [new task] }       │
│   ],                            │
│   error: null,                  │
│   lastSavedAt: 1708929610000, ← updated
│   isLoading: false              │
│ }                               │
└─────────────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────┐
│  Action Dispatched              │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  useTodoActions Hook            │
│  try {                          │
│    dispatch(action)   ← may fail│
│  } catch (err) {                │
└────────┬────────────────────────┘
         │
    ┌────┴─────────────────────────┐
    │ Success          No Error     │
    │                              │
    ▼                              ▼
┌──────────────┐         ┌──────────────────┐
│ Toast Success│         │ setError(        │
│ "Task added" │         │   error.message  │
└──────────────┘         │ )                │
                         └────────┬─────────┘
                                  │
                         ┌────────▼─────────┐
                         │ State updated    │
                         │ error: "message" │
                         └────────┬─────────┘
                                  │
                         ┌────────▼──────────┐
                         │ Toast Error       │
                         │ "Failed to..."    │
                         └────────┬──────────┘
                                  │
                         ┌────────▼──────────┐
                         │ 5 second timer    │
                         │ clears error      │
                         └───────────────────┘
```

## Redux DevTools Integration

```
┌──────────────────────────────────────┐
│  Redux DevTools (Browser Extension)  │
├──────────────────────────────────────┤
│                                      │
│  Actions Timeline:                   │
│  1. @@INIT                          │
│  2. persist/PERSIST                 │
│  3. persist/REHYDRATE               │
│  4. todo/addTask                    │
│  5. todo/updateTaskTitle            │
│  6. todo/toggleTask                 │
│                                      │
│  State Inspector:                    │
│  {                                   │
│    todo: {                           │
│      categories: [...]               │
│      error: null                     │
│      lastSavedAt: 1708929600000      │
│    }                                 │
│  }                                   │
│                                      │
│  Features:                           │
│  ✓ Time-travel debugging             │
│  ✓ Action replay                     │
│  ✓ State diff viewer                 │
│  ✓ Action stack                      │
│                                      │
└──────────────────────────────────────┘
```

## Component Hierarchy

```
<ReduxProvider>                     (Wraps app with Redux + Persist)
│
└─ <PersistGate>                   (Waits for hydration)
   │
   └─ <RootLayout>                 (App shell)
      │
      └─ <TodoPage>                (Page component)
         │
         └─ <TodoList>             (Main component)
            │
            ├─ Uses: useSelector() (read state)
            ├─ Uses: useTodoActions() (dispatch actions)
            ├─ Uses: useTodoStorage() (backup/restore)
            │
            ├─ <TodoCard>           (Category display)
            │  │
            │  ├─ Checkbox         (toggle completion)
            │  ├─ Task Title       (click to edit)
            │  ├─ Delete Button    (remove task)
            │  └─ Add Task Input   (new task)
            │
            └─ <Dialog>            (Add category modal)
               ├─ Input: Category name
               ├─ Select: Color picker
               └─ Buttons: Add/Cancel
```

## Performance Characteristics

```
Operation              Time        UI Impact
─────────────────────────────────────────────
Add Task              < 1ms       Instant
Toggle Task           < 1ms       Instant
Delete Task           < 1ms       Instant
Save to localStorage  ~ 5-10ms    Non-blocking
Read from localStorage ~ 1-5ms    on load
Render 1000 tasks    ~ 50-100ms   Smooth
Cross-tab sync       ~ 50ms       Fast
```

## Persistence Lifecycle

```
┌──────────────────────────────────────────────┐
│ Page Load                                    │
└──────────────┬───────────────────────────────┘
              │
    ┌─────────▼──────────┐
    │ Redux Store Init   │
    │ Initial State      │
    └─────────┬──────────┘
              │
    ┌─────────▼──────────────────┐
    │ Redux-Persist Rehydrate    │
    │ 1. Read localStorage       │
    │ 2. Merge with initial      │
    │ 3. Dispatch @@ REHYDRATE   │
    └─────────┬──────────────────┘
              │
    ┌─────────▼──────────────────┐
    │ PersistGate Unlocks        │
    │ Renders children           │
    └─────────┬──────────────────┘
              │
    ┌─────────▼──────────────────┐
    │ Components Render          │
    │ With Hydrated State        │
    └─────────┬──────────────────┘
              │
    ┌─────────▼──────────────────┐
    │ User Interacts             │
    │ Actions Dispatched         │
    └─────────┬──────────────────┘
              │
    ┌─────────▼──────────────────┐
    │ Redux-Persist Syncs        │
    │ On every state change      │
    │ Automatic saving           │
    └──────────────────────────────┘
```

---

This architecture ensures:
- ✅ **Automatic persistence** without manual API calls
- ✅ **Error resilience** with proper error boundaries
- ✅ **Type safety** with full TypeScript support
- ✅ **Performance** with non-blocking localStorage writes
- ✅ **Developer experience** with Redux DevTools integration
- ✅ **Cross-browser** compatibility for localStorage
