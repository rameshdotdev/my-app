import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { WakaTimeYesterdayResponse } from "@/types/wakatime";

const initialState: WakaTimeYesterdayResponse = {
  combined: {
    total_seconds: 0,
    text: "0m",
  },
  date: null,
  editors: [],
  source: "live",
};

export const wakatimeSlice = createSlice({
  name: "wakatime",
  initialState,
  reducers: {
    setYesterdayWorks: (
      state,
      action: PayloadAction<WakaTimeYesterdayResponse>,
    ) => {
      state.combined = action.payload.combined;
      state.date = action.payload.date;
      state.editors = action.payload.editors;
      state.source = action.payload.source;
    },
  },
});

export const { setYesterdayWorks } = wakatimeSlice.actions;
export const getYesterdayData = (state: RootState) => state.wakatime;
export default wakatimeSlice.reducer;
