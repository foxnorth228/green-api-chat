class GreenApi {
  static host = "https://api.green-api.com/";

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
      GreenApi.getFullActionUrl("getStateInstance", id, token),
    )
      .then((result) => {
        if (result.status === 401) {
          return Promise.reject("Your token is incorrect");
        } else if (result.status === 403) {
          return Promise.reject("Your ID is incorrect");
        } else if (result.status > 399) {
          return Promise.reject(
            "Something went wrong. " + result.status + " " + result.statusText,
          );
        }
        return result.json();
      })
      .then((data) => {
        const acceptState = ["authorized", "sleepMode", "starting"];
        if (!acceptState.includes(data!.stateInstance as string)) {
          Promise.reject("This account isn't authorized or got banned");
        }
        return true;
      })
      .catch((err) => {
        if (
          err instanceof Error ||
          err instanceof Promise ||
          typeof err === "string"
        ) {
          return err;
        }
      });
    return response;
  }
}

export default GreenApi;
