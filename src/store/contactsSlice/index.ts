import { createSlice } from "@reduxjs/toolkit";
import { getContactsInfo } from "@store/contactsSlice/api";
import config from "@store/contactsSlice/config";

const contactsSlice = createSlice({
  name: config.name,
  initialState: config.initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactsInfo.fulfilled, (state, action) => {
      if (action.payload === null) {
        return;
      }
      if (typeof action.payload === "string") {
        throw action.payload;
      }
      return {
        ...state,
        [action.meta.arg]: {
          name: action.payload.name,
          avatar: action.payload.avatar,
        },
      };
    });
  },
});

export default contactsSlice.reducer;
