import React from "react";
import "./chat.scss";
import { ChatManagerList, ChatManagerMenu } from "@components/chat-manager";
import {
  ChatMessagingChatzone,
  ChatMessagingMenu,
} from "@src/components/chat-messaging";

const Chat = () => {
  return (
    <main className="chat">
      <ChatManagerMenu />
      <ChatMessagingMenu />
      <ChatManagerList />
      <ChatMessagingChatzone />
    </main>
  );
};

export default Chat;
