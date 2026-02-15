import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";
import skillCategoryReducer from "./features/skillCategorySlice";
import heroReducer from "./features/heroSlice";
import projectReducers from "./features/projectSlice";
import skillReducer from "./features/skillSlice";
import messageReducer from "./features/messageSlice";
import contactReducer from "./features/contactSlice";
import worksReducer from "./features/workSlice";
import loadingReducer from "./features/loadingSlice";
import visitorReducer from "./features/visitorSlice";
import wakatimeReducer from "./features/wakatimeSlice";
import todoReducer from "./features/todoSlice";

// Configure persist for todo slice
const todoPersistConfig = {
  key: "todo",
  storage: storage,
  whitelist: ["categories", "lastSavedAt"], // Only persist these fields
  version: 1,
};

const persistedTodoReducer = persistReducer(todoPersistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    skillCategory: skillCategoryReducer,
    hero: heroReducer,
    projects: projectReducers,
    skills: skillReducer,
    messages: messageReducer,
    contact: contactReducer,
    works: worksReducer,
    loading: loadingReducer,
    visitor: visitorReducer,
    wakatime: wakatimeReducer,
    todo: persistedTodoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPath: ["todo"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
