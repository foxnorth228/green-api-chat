import "./style.scss";

import config from "@components/SubmitMessage/config";
import { ISubmitMessage } from "@components/SubmitMessage/types";
import configApi from "@services/GreenApi/config";
import globalConfig from "@src/config";
import { useChatsAddMessage } from "@store/chatsSlice/hooks";
import { useAddFailedRequest } from "@store/failedRequestsSlice/hooks";
import React, { useCallback, useState } from "react";

const SubmitMessage = ({ currentChat }: ISubmitMessage) => {
  const addMessage = useChatsAddMessage();
  const [message, setMessage] = useState("");
  const addFailedRequest = useAddFailedRequest();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (globalConfig.service === null) {
        return;
      }
      addMessage(currentChat, { isUserOwner: true, message });
      setMessage("");
      const result = await globalConfig.service?.sendMessage(
        currentChat,
        message,
      );
      if (
        typeof result !== "string" &&
        "message" in result &&
        result.message === configApi.errorFailedFetch
      ) {
        addFailedRequest(result.fallbackObj);
      } else if (typeof result === "string") {
        throw result;
      }
    },
    [addFailedRequest, addMessage, currentChat, message],
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
