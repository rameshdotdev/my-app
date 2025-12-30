import { Skill } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Skill[] = [];

export const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (_state, action: PayloadAction<Skill[]>) => {
      return action.payload;
    },
  },
});

export const { setSkills } = skillSlice.actions;
export const getSkills = (state: RootState) => state.skills;
export default skillSlice.reducer;
