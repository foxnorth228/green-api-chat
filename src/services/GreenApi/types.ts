export interface IGetStateInstanceData {
  stateInstance:
    | "notAuthorized"
    | "authorized"
    | "blocked"
    | "sleepMode"
    | "starting"
    | "yellowCard";
}

export interface ICheckIfWhatsappExist {
  existsWhatsapp: boolean;
}

export interface IReceiveNotification {
  receiptId?: string;
  body: {
    senderData?: {
      chatId?: string;
    };
    messageData?: {
      typeMessage?: string;
      textMessageData?: {
        textMessage?: string;
      };
    };
  };
}

export interface IDeleteNotificationResponse {
  result: boolean;
}
