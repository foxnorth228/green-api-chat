import { createAsyncThunk } from "@reduxjs/toolkit";
import globalConfig from "@src/config";

export const getContactsInfo = createAsyncThunk(
  "contacts/getContactsInfo",
  async (phone: string) => {
    if (globalConfig.service === null) {
      return null;
    }
    return await globalConfig.service.getContactInfo(phone);
  },
);
