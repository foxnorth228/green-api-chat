import "./style.scss";

import { ChatManager } from "@components/ChatManager";
import { ChatZone } from "@components/ChatZone";
import { SelectedChat } from "@components/SelectedChat";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import React, { useState } from "react";

const Chat = () => {
  useRedirectUnauthUser();
  const [currentChat, setCurrentChat] = useState("");
  return (
    <main className="chat">
      <div></div>
      <SelectedChat currentChat={currentChat} />
      <ChatManager chat={currentChat} setCurrentChat={setCurrentChat} />
      <ChatZone currentChat={currentChat} />
    </main>
  );
};

export default Chat;
