import { IContactsSlice } from "@store/contactsSlice/types";

export const contactsName = "contacts";
const config = {
  name: contactsName,
  initialState: {} as IContactsSlice,
};

export default config;
