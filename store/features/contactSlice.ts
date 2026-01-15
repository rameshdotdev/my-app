import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ContactData } from "@/types/type";
import type { RootState } from "..";

const initialState: ContactData = {
  email: "",
  social: {},
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<ContactData>) => {
      state.email = action.payload.email;
      state.social = action.payload.social;
    },

    // Optional: reset (useful on logout)
    resetContactData: () => initialState,
  },
});

export const { setContactData, resetContactData } = contactSlice.actions;

// Selector
export const getContactData = (state: RootState) => state.contact;

export default contactSlice.reducer;
