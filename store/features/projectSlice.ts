import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Project } from "@/types/project";

type ProjectsState = {
  items: Project[];
};

const initialState: ProjectsState = {
  items: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.items.unshift(action.payload);
    },

    updateProjectInStore: (state, action: PayloadAction<Project>) => {
      const updated = action.payload;
      const idx = state.items.findIndex((p) => p._id === updated._id);
      if (idx !== -1) state.items[idx] = updated;
    },

    removeProject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((p) => p._id !== id);
    },

    clearProjects: (state) => {
      state.items = [];
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProjectInStore,
  removeProject,
  clearProjects,
} = projectSlice.actions;

/* =========================
   Selectors
========================= */
export const selectProjects = (state: RootState) => state.projects.items;

export const selectProjectById = (id: string) => (state: RootState) =>
  state.projects.items.find((p) => p._id === id);

export default projectSlice.reducer;
