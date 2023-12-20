import { RootState } from "@src/store";
import { useSelector } from "react-redux";

export const useGetContacts = () => {
  return useSelector((state: RootState) => state.contacts);
};
