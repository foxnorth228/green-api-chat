import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GreenApi from "@services/GreenApi";
import globalConfig from "@src/config";
import { getUserStatus } from "@store/userSlice/api";

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
  extraReducers: (builder) => {
    builder.addCase(getUserStatus.fulfilled, (state, action) => {
      if (typeof action.payload === "boolean" && action.payload) {
        globalConfig.service = new GreenApi(
          action.meta.arg.id,
          action.meta.arg.token,
        );
        return {
          ...state,
          id: action.meta.arg.id,
          token: action.meta.arg.token,
        };
      }
      return state;
    });
  },
});

export const { setId, setToken } = userSlice.actions;
export default userSlice.reducer;
