export interface IGetStateInstanceData {
  stateInstance:
    | "notAuthorized"
    | "authorized"
    | "blocked"
    | "sleepMode"
    | "starting"
    | "yellowCard";
}

export interface IGetContactInfo {
  name: string;
  avatar: string;
}

export interface ICheckIfWhatsappExist {
  existsWhatsapp: boolean;
}

export interface IReceiveNotification {
  receiptId?: string;
  body: {
    timestamp?: number;
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

export interface IFailedRequest {
  action: string;
  method: string;
  body?: string;
  sideEffect?: (arg: string | object | boolean) => void;
}
