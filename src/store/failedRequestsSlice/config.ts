import { IFailedRequest } from "@store/failedRequestsSlice/types";

export const failedRequestsName = "failedRequests";
const config = {
  name: failedRequestsName,
  initialState: [] as IFailedRequest[],
};

export default config;
