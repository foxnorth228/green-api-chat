import "./style.scss";

import BlockMessages from "@components/BlockMessages";
import { IChatZone } from "@components/ChatZone/types";
import SubmitMessage from "@components/SubmitMessage";
import UseReceiveNotifications from "@hooks/useReceiveNotifications";
import { useChats } from "@store/chatsSlice/hooks";
import React, { useMemo } from "react";

export const ChatZone = ({ currentChat }: IChatZone) => {
  UseReceiveNotifications();
  const chats = useChats();
  const messages = useMemo(
    () => chats[currentChat] ?? [],
    [chats, currentChat],
  );

  return (
    <div className="chatZone">
      {currentChat !== "" && (
        <>
          <BlockMessages messages={messages} />
          <SubmitMessage currentChat={currentChat} />
        </>
      )}
    </div>
  );
};
