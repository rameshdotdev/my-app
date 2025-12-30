import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Hero } from "@/types/type";
import { RootState } from "..";

const initialState: Hero = {
  _id: "",
  name: "",
  description: "",
  resumeUrl: "",
  titles: [],
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroData: (state, action: PayloadAction<Hero>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.resumeUrl = action.payload.resumeUrl;
      state.titles = action.payload.titles;
    },
  },
});

export const { setHeroData } = heroSlice.actions;
export const getHeroData = (state: RootState) => state.hero;
export default heroSlice.reducer;
