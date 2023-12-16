import "./style.scss";

import { useChats } from "@store/chatsSlice/hooks";
import React from "react";

import { IChatList } from "./types";

const ChatList = ({ chat, setCurrentChat }: IChatList) => {
  const chats = useChats();

  return (
    <div className="chatList">
      {Object.keys(chats).map((el) => (
        <div
          key={el}
          className={`chatList__elem ${
            el === chat && "chatList__elem_selected"
          }`}
          onClick={() => {
            setCurrentChat(el);
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
