import React from "react";

export interface IChatList {
  chat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
