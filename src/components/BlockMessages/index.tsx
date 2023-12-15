import { IBlockMessages } from "@components/BlockMessages/types";
import React from "react";

const BlockMessages = ({ messages }: IBlockMessages) => {
  return (
    <div className="chatMessagingChatzone__messages">
      {messages.map((el, i) => (
        <div
          key={i}
          className="chatMessagingChatzone__message"
          style={{
            backgroundColor: el.isUserOwner ? "#d9fdd3" : "white",
            alignSelf: el.isUserOwner ? "end" : "start",
          }}
        >
          {el.message}
        </div>
      ))}
    </div>
  );
};

export default BlockMessages;
