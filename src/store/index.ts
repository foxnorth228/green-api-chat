import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "@store/chatsSlice";
import { chatsName } from "@store/chatsSlice/config";
import userReducer from "@store/userSlice";
import { userName } from "@store/userSlice/config";

const store = configureStore({
  reducer: {
    [userName]: userReducer,
    [chatsName]: chatsReducer,
  },
});

export default store;
export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
