import { RootState, StoreDispatch } from "@src/store";
import { getUserStatus } from "@store/userSlice/api";
import { useDispatch, useSelector } from "react-redux";

export const useUserData = (): [string, string] => {
  const user = useSelector((state: RootState) => state.user);
  return [user.id, user.token];
};

export const useGetUserStatus = () => {
  const dispatch = useDispatch<StoreDispatch>();
  return async (id: string, token: string) =>
    await dispatch(getUserStatus({ id, token }));
};
