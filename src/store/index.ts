import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/userSlice";
import { userName } from "@store/userSlice/config";
import chatsReducer from "@store/chatsSlice";
import { chatsName } from "@store/chatsSlice/config";

const store = configureStore({
  reducer: {
    [userName]: userReducer,
    [chatsName]: chatsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
