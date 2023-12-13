import "./chat-messaging-chatzone.scss";

import useChats from "@src/hooks/use-chat";
import useUser from "@src/hooks/use-user";
import React, { useCallback, useState } from "react";

import ChatMessagingReceiving from "./chat-messaging-receiving";

interface IChatManagerList {
  currentChat: string;
}

export const ChatMessagingChatzone = ({ currentChat }: IChatManagerList) => {
  ChatMessagingReceiving();
  const { chats, setChats } = useChats();
  const { id, token } = useUser();

  const messageArrOrUnd = Object.entries(chats).find(
    (el) => el[0] === currentChat,
  );
  if (currentChat !== "" && !messageArrOrUnd) {
    throw new Error("Chat" + currentChat + "not exist");
  }
  const messageArr =
    ((messageArrOrUnd && messageArrOrUnd[1]) as Array<[boolean, string]>) || [];
  const [message, setMessage] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(`https://api.green-api.com/waInstance${id}/sendMessage/${token}`, {
        method: "POST",
        body: JSON.stringify({
          chatId: `${currentChat}@c.us`,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setChats({
            ...chats,
            [currentChat]: [...messageArr, [true, message]],
          });
          setMessage("");
        })
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chats, currentChat, id, message, setChats, token],
  );
  return (
    <div className="chatMessaging chatMessagingChatzone">
      {currentChat !== "" && (
        <>
          <div className="chatMessagingChatzone__messages">
            {messageArr.map((el, i) => (
              <div
                key={i}
                className="chatMessagingChatzone__message"
                style={{
                  backgroundColor: el[0] ? "#d9fdd3" : "white",
                  alignSelf: el[0] ? "end" : "start",
                }}
              >
                {el[1]}
              </div>
            ))}
          </div>
          <form
            onSubmit={onSubmit}
            className="chatMessagingChatzone__messaging"
          >
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
        </>
      )}
    </div>
  );
};
