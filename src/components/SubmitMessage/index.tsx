import "./style.scss";

import config from "@components/SubmitMessage/config";
import { ISubmitMessage } from "@components/SubmitMessage/types";
import globalConfig from "@src/config";
import { useChatsAddMessage } from "@store/chatsSlice/hooks";
import React, { useCallback, useState } from "react";

const SubmitMessage = ({ currentChat }: ISubmitMessage) => {
  const addMessage = useChatsAddMessage();
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (globalConfig.service === null) {
        return;
      }
      const result = await globalConfig.service?.sendMessage(
        currentChat,
        message,
      );
      if (typeof result === "object") {
        addMessage(currentChat, { isUserOwner: true, message });
      } else {
        throw result;
      }
      setMessage("");
    },
    [addMessage, currentChat, message],
  );

  const onChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.currentTarget.value);
    },
    [],
  );

  return (
    <form onSubmit={onSubmit} className="submitMessage">
      <input
        type="text"
        name={config.inputMessageName}
        value={message}
        placeholder={config.inputMessagePlaceholder}
        className="submitMessage__input"
        required={true}
        onChange={onChangeMessage}
      />
      <button className="submitMessage__buttonSubmit" type="submit">
        {config.buttonSubmitTitle}
      </button>
    </form>
  );
};

export default SubmitMessage;
