import { createContext } from "react";

interface IUserContext {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<IUserContext>({
  id: "",
  setId: () => {},
  token: "",
  setToken: () => {},
});

export default UserContext;
