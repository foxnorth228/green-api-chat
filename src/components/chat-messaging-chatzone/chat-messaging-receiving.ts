import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import { useUserData } from "@store/userSlice/hooks";
import { useEffect } from "react";

const ChatMessagingReceiving = () => {
  const chats = useChats();
  const addMessage = useChatsAddMessage();
  const [id, token] = useUserData();
  useEffect(() => {
    const timer = setInterval(() => {
      fetch(
        `https://api.green-api.com/waInstance${id}/receiveNotification/${token}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            fetch(
              `https://api.green-api.com/waInstance${id}/deleteNotification/${token}/${
                data!.receiptId
              }`,
              { method: "DELETE" },
            );
            const body = data!.body;
            const sender = String(parseInt(body?.senderData?.sender));
            const message: string =
              body?.messageData?.textMessageData?.textMessage;
            if (!sender || !message) {
              return;
            }
            Object.entries(chats).find((el) => el[0] === sender);
            addMessage(sender, { isUserOwner: false, message });
          }
        })
        .catch((err) => console.log(err));
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });
};

export default ChatMessagingReceiving;
