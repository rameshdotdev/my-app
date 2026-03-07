import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const getLoadingState = (state: RootState) => state.loading.isLoading;
export default loadingSlice.reducer;
