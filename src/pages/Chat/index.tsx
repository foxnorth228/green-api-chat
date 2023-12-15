import "./style.scss";

import { ChatMessagingChatzone } from "@components/chat-messaging-chatzone/chat-messaging-chatzone";
import { ChatMessagingMenu } from "@components/chat-messaging-menu/chat-messaging-menu";
import { ChatManager } from "@components/ChatManager";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import React, { useState } from "react";

const Chat = () => {
  useRedirectUnauthUser();
  const [currentChat, setCurrentChat] = useState("");
  return (
    <main className="chat">
      <div></div>
      <ChatMessagingMenu currentChat={currentChat} />
      <ChatManager setCurrentChat={setCurrentChat} />
      <ChatMessagingChatzone currentChat={currentChat} />
    </main>
  );
};

export default Chat;
