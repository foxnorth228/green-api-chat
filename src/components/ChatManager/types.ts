import React from "react";

export interface IChatManager {
  chat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
