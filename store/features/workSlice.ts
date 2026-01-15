import { Work } from "@/types/work";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
const initialState: Work[] = [];
export const workSlice = createSlice({
	initialState,
	name: "works",
	reducers: {
		setWorksData: (_state, action: PayloadAction<Work[]>) => {
			return action.payload;
		},

		addWork: (state, action: PayloadAction<Work>) => {
			state.unshift(action.payload);
		},

		updateWork: (state, action: PayloadAction<Work>) => {
			const index = state.findIndex((w) => w._id === action.payload._id);
			if (index !== -1) state[index] = action.payload;
		},

		removeWork: (state, action: PayloadAction<string>) => {
			return state.filter((w) => w._id !== action.payload);
		},
	},
});

export const { setWorksData, addWork, removeWork, updateWork } =
	workSlice.actions;
export const getWorksData = (state: RootState) => state.works;
export default workSlice.reducer;
