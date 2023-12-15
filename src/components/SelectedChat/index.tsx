import "./style.scss";

import React from "react";

import { IChatMessagingMenu } from "./types";

export const SelectedChat = ({ currentChat }: IChatMessagingMenu) => {
  return (
    <div className="selectedChat">
      <p className="selectedChat__title">{currentChat}</p>
    </div>
  );
};
