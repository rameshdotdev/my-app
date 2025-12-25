import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "@/types/type";
import { RootState } from "..";

// Define the initial state using that type
const initialState: AuthResponse = {
  _id: "",
  email: "",
  name: "",
  avatar: undefined,
};

export const counterSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    removeUser(state) {
      state._id = "";
      state.email = "";
      state.name = "";
      state.avatar = undefined;
    },
  },
});

export const { setUser, removeUser } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user;

export default counterSlice.reducer;
