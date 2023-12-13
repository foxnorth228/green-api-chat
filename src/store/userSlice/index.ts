import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import config from "./config";

const userSlice = createSlice({
  name: config.name,
  initialState: config.initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      return { ...state, id: action.payload };
    },
    setToken: (state, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
  },
});

export const { setId, setToken } = userSlice.actions;
export default userSlice.reducer;
