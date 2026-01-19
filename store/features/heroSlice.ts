import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { Hero } from "@/types/profile";

const emptyCharacter = {
  name: "",
  avatar: { url: "", publicId: "" },
  titles: [""],
  description: "",
  isVerified: false,
};

const initialState: Hero = {
  _id: "",
  characters: [emptyCharacter, emptyCharacter],
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroData: (state, action: PayloadAction<Hero>) => {
      state._id = action.payload._id || "";
      state.characters = action.payload.characters;
    },

    // optional: if you want to reset on logout etc.
    resetHeroData: (state) => {
      state._id = "";
      state.characters = [emptyCharacter, emptyCharacter];
    },
  },
});

export const { setHeroData, resetHeroData } = heroSlice.actions;
export const getHeroData = (state: RootState) => state.hero;
export default heroSlice.reducer;
