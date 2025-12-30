import { SkillCategory } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: SkillCategory[] = [];

export const skillCategorySlice = createSlice({
  name: "skillCategory",
  initialState,
  reducers: {
    setSkillCategories: (_state, action: PayloadAction<SkillCategory[]>) => {
      return action.payload;
    },
  },
});

export const { setSkillCategories } = skillCategorySlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getSkillCategories = (state: RootState) => state.skillCategory;

export default skillCategorySlice.reducer;
