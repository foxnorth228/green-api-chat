import "./style.scss";

import ChatList from "@components/ChatList";
import NewChatAdding from "@components/NewChatAdding";
import React from "react";

import { IChatManager } from "./types";

export const ChatManager = ({ chat, setCurrentChat }: IChatManager) => {
  return (
    <div className="chatManager">
      <NewChatAdding />
      <ChatList chat={chat} setCurrentChat={setCurrentChat} />
    </div>
  );
};
