import config from "./config";
import { IGetStateInstanceData } from "@services/GreenApi/types";

class GreenApi {
  static host = config.host;

  id;
  token;
  getFullActionUrl = (action: string, id = this.id, token = this.token) =>
    `${GreenApi.host}waInstance${id}/${action}/${token}`;
  static getFullActionUrl = (action: string, id: string, token: string) =>
    `${GreenApi.host}waInstance${id}/${action}/${token}`;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }

  static async getUserStatus(id: string, token: string) {
    const response: string | boolean | Error = await fetch(
      GreenApi.getFullActionUrl(config.actionGetUserState, id, token),
    )
      .then((result) => {
        if (result.status === 401) {
          return Promise.reject(config.messageErrorWrongToken);
        } else if (result.status === 403) {
          return Promise.reject(config.messageErrorWrongID);
        } else if (result.status > 399) {
          return Promise.reject(
            `${config.messageError} ${result.status} ${result.statusText}`,
          );
        }
        return result.json();
      })
      .then((data: IGetStateInstanceData) => {
        const acceptState = ["authorized", "sleepMode", "starting"];
        if (!acceptState.includes(data!.stateInstance as string)) {
          Promise.reject(config.messageErrorBadAccount);
        }
        return true;
      })
      .catch((err) => {
        if (err instanceof Error) {
          if (err.message === config.CORSFailedFetch) {
            return config.messageErrorWrongID;
          }
          return err.message;
        } else if (err instanceof Promise || typeof err === "string") {
          return err;
        }
      });
    return response;
  }
}

export default GreenApi;
