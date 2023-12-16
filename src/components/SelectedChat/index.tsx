import "./style.scss";

import React from "react";

import { ISelectedMenu } from "./types";

export const SelectedChat = ({ currentChat }: ISelectedMenu) => {
  return (
    <div className="selectedChat">
      <p className="selectedChat__title">{currentChat}</p>
    </div>
  );
};
