import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "@store/chatsSlice";
import { chatsName } from "@store/chatsSlice/config";
import contactsReducer from "@store/contactsSlice";
import { contactsName } from "@store/contactsSlice/config";
import failedRequestsSlice from "@store/failedRequestsSlice";
import { failedRequestsName } from "@store/failedRequestsSlice/config";
import userReducer from "@store/userSlice";
import { userName } from "@store/userSlice/config";

const store = configureStore({
  reducer: {
    [userName]: userReducer,
    [chatsName]: chatsReducer,
    [contactsName]: contactsReducer,
    [failedRequestsName]: failedRequestsSlice,
  },
});

export default store;
export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
