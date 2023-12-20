import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "@store/failedRequestsSlice/config";
import { IFailedRequest } from "@store/failedRequestsSlice/types";

const failedRequestsSlice = createSlice({
  name: config.name,
  initialState: config.initialState,
  reducers: {
    addFailedRequest: (state, action: PayloadAction<IFailedRequest>) => {
      return [...state, action.payload];
    },
    changeFailedRequest: (_, action: PayloadAction<IFailedRequest[]>) => {
      return action.payload;
    },
  },
});

export const { addFailedRequest, changeFailedRequest } =
  failedRequestsSlice.actions;
export default failedRequestsSlice.reducer;
