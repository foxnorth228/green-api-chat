import "./style.scss";

import { IBlockMessages } from "@components/BlockMessages/types";
import React from "react";

const BlockMessages = ({ messages }: IBlockMessages) => {
  return (
    <div className="blockMessages">
      <div className="blockMessages__messages">
        {messages.map((el, i) => (
          <div
            key={i}
            className={`blockMessages__message ${
              el.isUserOwner && "blockMessages__message_user"
            }`}
          >
            {el.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockMessages;
