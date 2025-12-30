import { Project } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Project[] = [];
export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (_state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;
export const getProjects = (state: RootState) => state.projects;
export default projectSlice.reducer;
