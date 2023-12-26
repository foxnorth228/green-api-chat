import "./style.scss";

import BlockMessages from "@components/BlockMessages";
import { IChatZone } from "@components/ChatZone/types";
import SubmitMessage from "@components/SubmitMessage";
import { useChats } from "@store/chatsSlice/hooks";
import React, { useMemo } from "react";

export const ChatZone = ({ currentChat }: IChatZone) => {
  const chats = useChats();
  const messages = useMemo(
    () => chats[currentChat] ?? [],
    [chats, currentChat],
  );

  return (
    <section className="chatZone">
      {currentChat !== "" && (
        <>
          <BlockMessages messages={messages} />
          <SubmitMessage currentChat={currentChat} />
        </>
      )}
    </section>
  );
};
