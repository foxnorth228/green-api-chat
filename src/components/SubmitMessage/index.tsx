import { IInputMessage } from "@components/SubmitMessage/types";
import globalConfig from "@src/config";
import { useChatsAddMessage } from "@store/chatsSlice/hooks";
import React, { useCallback, useState } from "react";

const SubmitMessage = ({ currentChat }: IInputMessage) => {
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
  return (
    <form onSubmit={onSubmit} className="chatMessagingChatzone__messaging">
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Message..."
        className="chatMessagingChatzone__messageinput"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
      />
      <button className="chatMessagingChatzone__submit" type="submit">
        Send
      </button>
    </form>
  );
};

export default SubmitMessage;
