import { createAsyncThunk } from "@reduxjs/toolkit";
import GreenApi from "@services/GreenApi";

export const getUserStatus = createAsyncThunk(
  "greenApi/getUserStatus",
  async ({ id, token }: { id: string; token: string }) => {
    return await GreenApi.checkIsUserExist(id, token);
  },
);
