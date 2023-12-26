import "./style.scss";

import ChatList from "@components/ChatList";
import NewChatAdding from "@components/NewChatAdding";
import React from "react";

import { IChatManager } from "./types";

export const ChatManager = ({
  className,
  chat,
  setCurrentChat,
}: IChatManager) => {
  return (
    <section className={`chatManager ${className}`}>
      <NewChatAdding />
      <ChatList chat={chat} setCurrentChat={setCurrentChat} />
    </section>
  );
};
