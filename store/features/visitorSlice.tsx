import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type visitors = {
  visitors: number;
  pageviews: number;
};
const initialState: visitors = {
  visitors: 0,
  pageviews: 0,
};

export const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setVisitorCounts: (state, action: { payload: visitors }) => {
      state.visitors = action.payload.visitors;
      state.pageviews = action.payload.pageviews;
    },
  },
});

export const { setVisitorCounts } = visitorSlice.actions;
export const getVisitorCounts = (state: RootState) => state.visitor;
export default visitorSlice.reducer;
