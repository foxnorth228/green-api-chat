import React, { useState } from "react";
import "./chat.scss";
import { ChatManagerList, ChatManagerMenu } from "@components/chat-manager";
import {
  ChatMessagingChatzone,
  ChatMessagingMenu,
} from "@src/components/chat-messaging";
import useRedirectUnauthUser from "@hooks/use-redirect-unauth-user";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState("");
  useRedirectUnauthUser();
  return (
    <main className="chat">
      <ChatManagerMenu />
      <ChatMessagingMenu currentChat={currentChat} />
      <ChatManagerList setCurrentChat={setCurrentChat} />
      <ChatMessagingChatzone currentChat={currentChat} />
    </main>
  );
};

export default Chat;
