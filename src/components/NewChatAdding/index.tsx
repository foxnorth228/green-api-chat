import "./style.scss";

import config from "@components/NewChatAdding/config";
import globalConfig from "@src/config";
import { useChatsAddChat } from "@store/chatsSlice/hooks";
import React, { useCallback, useState } from "react";

const NewChatAdding = () => {
  const addChat = useChatsAddChat();
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (globalConfig.service === null) {
        return;
      }
      const result: string | boolean =
        await globalConfig.service?.checkIfWhatsappExist(phoneNumber);
      if (typeof result === "boolean" && result) {
        addChat(phoneNumber);
      } else if (typeof result === "string") {
        throw result;
      }
      setPhoneNumber("");
    },
    [addChat, phoneNumber],
  );

  const onChangeSetPhoneNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.currentTarget.value);
    },
    [],
  );
  return (
    <form className="newChatAdding" onSubmit={onSubmit}>
      <input
        name={config.inputPhoneName}
        className="newChatAdding__inputPhone"
        type="tel"
        placeholder={config.inputPhonePlaceholder}
        required={true}
        pattern="[0-9]{11,12}"
        title={config.tooltipText}
        value={phoneNumber}
        onChange={onChangeSetPhoneNumber}
      />
      <button className="newChatAdding__buttonSubmit" type="submit" />
    </form>
  );
};

export default NewChatAdding;
