import useChats from "@src/hooks/use-chat";
import useUser from "@src/hooks/use-user";
import { useEffect } from "react";

const ChatMessagingReceiving = () => {
  const { chats, setChats } = useChats();
  const { id, token } = useUser();
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
            const messageArrOrUnd = Object.entries(chats).find(
              (el) => el[0] === sender,
            );
            const messageArr =
              ((messageArrOrUnd && messageArrOrUnd[1]) as Array<
                [boolean, string]
              >) || [];
            setChats({ ...chats, [sender]: [...messageArr, [false, message]] });
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
