import { RootState, StoreDispatch } from "@src/store";
import { useDispatch, useSelector } from "react-redux";

import { setId, setToken } from "./";
import { getUserStatus } from "@store/userSlice/api";

export const useUserData = (): [string, string] => {
  const user = useSelector((state: RootState) => state.user);
  return [user.id, user.token];
};

export const useUserId = (): [string, (id: string) => unknown] => {
  const id = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  return [id, (id: string) => dispatch(setId(id))];
};

export const useUserToken = (): [string, (token: string) => unknown] => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  return [token, (token: string) => dispatch(setToken(token))];
};

export const useGetUserStatus = () => {
  const dispatch = useDispatch<StoreDispatch>();
  return async (id: string, token: string) =>
    await dispatch(getUserStatus({ id, token }));
};
