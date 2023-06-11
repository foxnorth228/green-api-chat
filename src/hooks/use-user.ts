import UserContext from "@src/contexts/UserContext";
import { useContext } from "react";

const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export default useUser;
