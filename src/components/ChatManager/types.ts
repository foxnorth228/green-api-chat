import React from "react";

export interface IChatManager {
  className: string;
  chat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
