import "./chat.scss";

import { ChatManagerList, ChatManagerMenu } from "@components/chat-manager";
import useRedirectUnauthUser from "@hooks/use-redirect-unauth-user";
import {
  ChatMessagingChatzone,
  ChatMessagingMenu,
} from "@src/components/chat-messaging";
import React, { useState } from "react";

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
