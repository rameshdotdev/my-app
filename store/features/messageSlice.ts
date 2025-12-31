import { Message } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Message[] = [];

export const contactSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (_state, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
  },
});

export const { setMessage } = contactSlice.actions;
export const getMessages = (state: RootState) => state.messages;
export default contactSlice.reducer;
