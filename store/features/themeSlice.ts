import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type ThemeState = {
  mode: "light" | "dark";
};

const initialState: ThemeState = {
  mode: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: { payload: "light" | "dark" }) => {
      state.mode = action.payload;
    },
  },
});
export const { setMode } = themeSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getTheme = (state: RootState) => state.theme;
export default themeSlice.reducer;
