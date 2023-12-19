const config = {
  host: "https://api.green-api.com/",
  fakeHost: "https://greenapiafdsagadgsgfgfddafsagsdadgs.com/",
  actionGetUserState: "getStateInstance",
  actionGetContactInfo: "getContactInfo",
  actionCheckIsWhatsappExist: "checkWhatsapp",
  actionSendMessage: "sendMessage",
  actionReceiveNotification: "receiveNotification",
  actionDeleteNotification: "deleteNotification",
  messageError: "Something went wrong.",
  messageErrorWrongID: "Your ID is incorrect",
  messageErrorWrongToken: "Your token is incorrect",
  messageErrorBadAccount: "This account isn't authorized or got banned",
  messageErrorWrongData: "This account isn't exist or you send incorrect data",
  errorFailedFetch: "Failed to fetch",
  postfixId: "@c.us",
};

export default config;
