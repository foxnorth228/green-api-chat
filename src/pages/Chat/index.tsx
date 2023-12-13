import "./style.scss";

import { ChatManagerList } from "@components/chat-manager-list/chat-manager-list";
import { ChatManagerMenu } from "@components/chat-manager-menu/chat-manager-menu";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import { ChatMessagingMenu } from "@components/chat-messaging-menu/chat-messaging-menu";
import { ChatMessagingChatzone } from "@components/chat-messaging-chatzone/chat-messaging-chatzone";
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
