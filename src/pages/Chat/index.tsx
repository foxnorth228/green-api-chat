import "./style.scss";

import { ChatManager } from "@components/ChatManager";
import { ChatZone } from "@components/ChatZone";
import { ChatMenu } from "@components/ChatMenu";
import useMatchMedia from "@hooks/useMatchMedia";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import globalConfig from "@src/config";
import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import React, { useCallback, useLayoutEffect, useState } from "react";
import configApi from "@services/GreenApi/config";

const Chat = () => {
  const isMatches = useMatchMedia("(max-width: 767px)");
  useRedirectUnauthUser();
  const chats = useChats();
  const addMessage = useChatsAddMessage();
  const receiveNotification = useCallback(async () => {
    if (globalConfig.service === null) {
      return null;
    }
    const result = await globalConfig.service?.receiveNotification();
    if (typeof result === "string") {
      if (result === configApi.errorFailedFetch) {
        return false;
      }
      throw result;
    }
    if (
      !result ||
      !result.receiptId ||
      typeof result.receiptId === "undefined"
    ) {
      return true;
    }
    await globalConfig.service?.deleteNotification(result.receiptId);
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
      if (!isCancelled) {
        if (isServiceWorks === null) {
          return;
        }
        if (isServiceWorks) {
          callback();
        } else {
          setTimeout(callback, 15000);
        }
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
      {isMatches ? (
        <>
          <div className="chat__menu_mobile">
            <input
              id="menu__toggle"
              type="checkbox"
              className="menu__toggle"
            ></input>
            <label htmlFor="menu__toggle" className="menu__btn">
              <span></span>
            </label>
            <ChatMenu currentChat={currentChat} />
            <ChatManager
              className="interactElem"
              chat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          </div>
          <ChatZone currentChat={currentChat} />
        </>
      ) : (
        <>
          <div></div>
          <ChatMenu currentChat={currentChat} />
          <ChatManager
            className=""
            chat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          <ChatZone currentChat={currentChat} />
        </>
      )}
    </main>
  );
};

export default Chat;
