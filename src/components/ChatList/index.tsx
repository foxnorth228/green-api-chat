import "./style.scss";

import { useChats } from "@store/chatsSlice/hooks";
import React from "react";

interface IChatList {
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}

const ChatList = ({ setCurrentChat }: IChatList) => {
  const chats = useChats();
  return (
    <div>
      {Object.keys(chats).map((el, i) => (
        <div
          key={i}
          className="chatManagerList__elem"
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
