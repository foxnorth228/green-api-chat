import { IUser } from "./types";

export const userName = "user";
const config = {
  name: userName,
  initialState: {
    id: "",
    token: "",
    greenApi: null,
  } as IUser,
};

export default config;
