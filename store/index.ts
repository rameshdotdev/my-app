import { configureStore } from "@reduxjs/toolkit";
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
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
