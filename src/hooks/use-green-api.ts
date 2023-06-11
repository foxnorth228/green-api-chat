import { useEffect } from "react";
import useRedirectUnauthUser from "./use-redirect-unauth-user";
import useUser from "./use-user";
interface IUseGreenApiBody {
  phoneNumber?: number;
}

async function useGreenApi(
  method: string,
  typeFetch = "",
  body: IUseGreenApiBody = {}
) {}

export default useGreenApi;
