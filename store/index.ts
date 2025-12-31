import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";
import skillCategoryReducer from "./features/skillCategorySlice";
import heroReducer from "./features/heroSlice";
import projectReducers from "./features/projectSlice";
import skillReducer from "./features/skillSlice";
import contactReducer from "./features/messageSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    skillCategory: skillCategoryReducer,
    hero: heroReducer,
    projects: projectReducers,
    skills: skillReducer,
    messages: contactReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
