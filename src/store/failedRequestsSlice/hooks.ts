import { RootState } from "@src/store";
import { addFailedRequest } from "@store/failedRequestsSlice/index";
import { IFailedRequest } from "@store/failedRequestsSlice/types";
import { useDispatch, useSelector } from "react-redux";

export const useFailedRequests = () => {
  return useSelector((state: RootState) => state.failedRequests);
};

export const useAddFailedRequest = () => {
  const dispatch = useDispatch();
  return (obj: IFailedRequest) => dispatch(addFailedRequest(obj));
};
