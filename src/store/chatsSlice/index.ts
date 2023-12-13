import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatAddMessage } from "@store/chatsSlice/types";

import config from "./config";

const chatsSlice = createSlice({
  name: config.name,
  initialState: config.initialState,
  reducers: {
    addChat: (state, action: PayloadAction<string>) => {
      return { ...state, [action.payload]: [] };
    },
    addMessage: (
      state,
      { payload: { phone, message } }: PayloadAction<IChatAddMessage>,
    ) => {
      state[phone].push(message);
      return state;
    },
  },
});

export const { addChat, addMessage } = chatsSlice.actions;
export default chatsSlice.reducer;
