import "./style.scss";

import SwitcherFakeApi from "@components/SwitcherFakeApi";
import React from "react";

import { ISelectedMenu } from "./types";

export const ChatMenu = ({ currentChat }: ISelectedMenu) => {
  return (
    <section className="chatMenu">
      <span className="chatMenu__selectedChat">{currentChat}</span>
      <SwitcherFakeApi />
    </section>
  );
};
