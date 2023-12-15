import "./style.scss";

import ChatList from "@components/ChatList";
import NewChatAdding from "@components/NewChatAdding";
import React from "react";

interface IChatManagerList {
  chat: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatManager = ({ chat, setCurrentChat }: IChatManagerList) => {
  return (
    <div className="chatManagerList">
      <NewChatAdding />
      <ChatList chat={chat} setCurrentChat={setCurrentChat} />
    </div>
  );
};
