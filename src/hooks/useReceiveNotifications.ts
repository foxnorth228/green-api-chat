import config from "@src/config";
import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import { useCallback, useEffect } from "react";

const UseReceiveNotifications = () => {
  const chats = useChats();
  const addMessage = useChatsAddMessage();
  const receiveNotification = useCallback(async () => {
    if (config.service === null) {
      return;
    }
    const result = await config.service?.receiveNotification();
    if (typeof result === "string") {
      throw result;
    }
    console.log(result);
    if (
      !result ||
      !result.receiptId ||
      typeof result.receiptId === "undefined"
    ) {
      return;
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
  }, [addMessage, chats]);
  useEffect(() => {
    let isCancelled = false;
    async function callback() {
      await receiveNotification();
      if (!isCancelled) {
        callback();
      }
    }
    callback();
    return () => {
      isCancelled = true;
    };
  });
};

export default UseReceiveNotifications;
