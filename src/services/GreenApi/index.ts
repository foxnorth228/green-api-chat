import {
  ICheckIfWhatsappExist, IFailedRequest,
  IGetStateInstanceData,
  IReceiveNotification,
} from "@services/GreenApi/types";

import config from "./config";

class GreenApi {
  static host = config.host;

  id;
  token;
  failedRequests: IFailedRequest[];
  isUsingFakeApi;
  getFullActionUrl = (action: string, id = this.id, token = this.token) =>
    `${
      this.isUsingFakeApi ? config.fakeHost : GreenApi.host
    }waInstance${id}/${action}/${token}`;
  static getFullActionUrl = (action: string, id: string, token: string) =>
    `${GreenApi.host}waInstance${id}/${action}/${token}`;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
    this.failedRequests = [];
    this.isUsingFakeApi = false;
  }

  static async checkIsUserExist(id: string, token: string) {
    return await fetch(
      GreenApi.getFullActionUrl(config.actionGetUserState, id, token),
    )
      .then((result) => {
        if (result.status === 400) {
          return Promise.reject(config.messageErrorWrongData);
        } else if (result.status === 401) {
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
          if (err.message === config.errorFailedFetch) {
            return config.messageErrorWrongID;
          }
          return err.message;
        } else if (typeof err === "string") {
          return err;
        }
        return false;
      });
  }

  static async makeAction(
    action: string,
    id: string,
    token: string,
    method: string,
    body?: string,
  ) {
    return await fetch(GreenApi.getFullActionUrl(action, id, token), {
      method,
      body: method === "GET" ? null : body,
    })
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => {
        if (err instanceof Error) {
          return err.message;
        } else if (typeof err === "string") {
          return err;
        }
        return false;
      });
  }

  switchUseFakeApi(isFake: boolean) {
    this.isUsingFakeApi = isFake;
  }

  async checkIfWhatsappExist(phone: string) {
    return await fetch(
      this.getFullActionUrl(config.actionCheckIsWhatsappExist),
      {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone }),
      },
    )
      .then((response) => response.json())
      .then((data: ICheckIfWhatsappExist) => data.existsWhatsapp)
      .catch((err) => {
        console.log(err);
        if (err instanceof Error) {
          return err.message;
        } else if (typeof err === "string") {
          return err;
        }
        return false;
      });
  }

  async getContactInfo(phone: string) {
    return await fetch(this.getFullActionUrl(config.actionGetContactInfo), {
      method: "POST",
      body: JSON.stringify({ chatId: `${phone}${config.postfixId}` }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  async sendMessage(phone: string, message: string) {
    return await fetch(this.getFullActionUrl(config.actionSendMessage), {
      method: "POST",
      body: JSON.stringify({
        chatId: `${phone}${config.postfixId}`,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data: object) => data)
      .catch((err) => {
        console.log(err);
        if (typeof err === "string") {
          return err;
        } else if (err instanceof Error) {
          if (err.message === config.errorFailedFetch) {
            this.failedRequests.push({
              action: config.actionSendMessage,
              method: "POST",
              body: JSON.stringify({
                chatId: `${phone}${config.postfixId}`,
                message: message,
              }),
            });
            return config.errorFailedFetch;
          }
          return err.message;
        }
        return "";
      });
  }

  async receiveNotification() {
    return await fetch(this.getFullActionUrl(config.actionReceiveNotification))
      .then(async (response) => {
        if (this.failedRequests.length !== 0) {
          for (let i = 0; i < this.failedRequests.length; ++i) {
            const { action, method, body } = this.failedRequests[i];
            await GreenApi.makeAction(
              action,
              this.id,
              this.token,
              method,
              body,
            );
          }
          this.failedRequests = [];
        }
        return response.json();
      })
      .then((data: IReceiveNotification) => data)
      .catch((err) => {
        console.log(err);
        if (typeof err === "string") {
          return err;
        } else if (err instanceof Error) {
          if (err.message === config.errorFailedFetch) {
            return config.errorFailedFetch;
          }
          return err.message;
        }
        return "";
      });
  }

  async deleteNotification(id: string) {
    return await fetch(
      `${this.getFullActionUrl(config.actionDeleteNotification)}/${id}`,
      { method: "DELETE" },
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        console.log(err);
        if (typeof err === "string") {
          return err;
        } else if (err instanceof Error) {
          return err.message;
        }
        return "";
      });
  }
}

export default GreenApi;
