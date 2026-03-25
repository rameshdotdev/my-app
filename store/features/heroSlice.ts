import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { Hero } from "@/types/profile";

const emptyCharacter = {
  avatar: {
    url: "https://res.cloudinary.com/dvzsnzhka/image/upload/v1768670426/zfuhgerelgo7fdovxgmd.png",
    publicId: "zfuhgerelgo7fdovxgmd",
  },
  name: "Ramesh Kumar",
  titles: ["Software Engineer", "Full Stack Developer", "Tech Enthusiast"],
  description:
    "Hey, I'm Ramesh a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.  \n\nTech stack isn't my concern, I'm flexible with whatever the project needs, though I prefer modern frameworks and tools. I'm always open for new opportunities to learn and grow.",
  isVerified: true,
};

type HeroState = Hero & {
  activeIndex: 0 | 1;
};

const initialState: HeroState = {
  _id: "",
  characters: [emptyCharacter, emptyCharacter],
  activeIndex: 0,
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroData: (state, action: PayloadAction<Hero>) => {
      state._id = action.payload._id || "";
      state.characters = action.payload.characters;

      // safety: if only 1 character exists
      if (!state.characters?.[1]) state.activeIndex = 0;
    },

    setActiveCharacter: (state, action: PayloadAction<0 | 1>) => {
      state.activeIndex = action.payload;
    },

    switchCharacter: (state) => {
      state.activeIndex = state.activeIndex === 0 ? 1 : 0;
    },

    resetHeroData: (state) => {
      state._id = "";
      state.characters = [emptyCharacter, emptyCharacter];
      state.activeIndex = 0;
    },
  },
});

export const {
  setHeroData,
  resetHeroData,
  switchCharacter,
  setActiveCharacter,
} = heroSlice.actions;

export const getHeroData = (state: RootState) => state.hero;

// optional selectors (recommended)
export const getActiveIndex = (state: RootState) => state.hero.activeIndex;
export const getActiveCharacter = (state: RootState) =>
  state.hero.characters?.[state.hero.activeIndex];

export default heroSlice.reducer;
