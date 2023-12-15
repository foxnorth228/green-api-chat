import "./style.scss";

import ChatList from "@components/ChatList";
import NewChatAdding from "@components/NewChatAdding";
import React from "react";

interface IChatManagerList {
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatManager = ({ setCurrentChat }: IChatManagerList) => {
  return (
    <div className="chatManagerList">
      <NewChatAdding />
      <ChatList setCurrentChat={setCurrentChat} />
    </div>
  );
};
