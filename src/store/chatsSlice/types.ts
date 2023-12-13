export interface IChatMessage {
  isUserOwner: boolean;
  message: string;
}

export interface IChats {
  [key: string]: IChatMessage[];
}

export interface IChatAddMessage {
  phone: string;
  message: IChatMessage;
}
