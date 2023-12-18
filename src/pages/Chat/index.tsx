import "./style.scss";

import { ChatManager } from "@components/ChatManager";
import { ChatZone } from "@components/ChatZone";
import { SelectedChat } from "@components/SelectedChat";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import config from "@src/config";
import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import React, { useCallback, useLayoutEffect, useState } from "react";

const Chat = () => {
  useRedirectUnauthUser();
  const chats = useChats();
  const addMessage = useChatsAddMessage();
  const receiveNotification = useCallback(async () => {
    if (config.service === null) {
      return false;
    }
    const result = await config.service?.receiveNotification();
    if (typeof result === "string") {
      throw result;
    }
    if (
      !result ||
      !result.receiptId ||
      typeof result.receiptId === "undefined"
    ) {
      return true;
    }
    await config.service?.deleteNotification(result.receiptId);
    const body = result.body;
    const sender = String(parseInt(body?.senderData?.chatId ?? ""));
    const typeMessage = body?.messageData?.typeMessage;
    if (typeMessage && typeMessage === "textMessage" && sender in chats) {
      addMessage(sender, {
        isUserOwner: false,
        message: body?.messageData?.textMessageData?.textMessage ?? "",
      });
    }
    return true;
  }, [addMessage, chats]);
  useLayoutEffect(() => {
    let isCancelled = false;
    async function callback() {
      const isServiceWorks = await receiveNotification();
      console.log(isServiceWorks);
      if (!isCancelled && isServiceWorks) {
        callback();
      }
    }
    callback();
    return () => {
      isCancelled = true;
    };
  }, [receiveNotification]);

  const [currentChat, setCurrentChat] = useState("");
  return (
    <main className="chat">
      <div></div>
      <SelectedChat currentChat={currentChat} />
      <ChatManager chat={currentChat} setCurrentChat={setCurrentChat} />
      <ChatZone currentChat={currentChat} />
    </main>
  );
};

export default Chat;
