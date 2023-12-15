import "./chat-messaging-chatzone.scss";

import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import { useUserData } from "@store/userSlice/hooks";
import React, { useCallback, useState } from "react";

import ChatMessagingReceiving from "./chat-messaging-receiving";

interface IChatManagerList {
  currentChat: string;
}

export const ChatMessagingChatzone = ({ currentChat }: IChatManagerList) => {
  ChatMessagingReceiving();
  const chats = useChats();
  console.log(chats);
  const addMessage = useChatsAddMessage();
  const [id, token] = useUserData();

  const messageArr = chats[currentChat] ?? [];
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
          addMessage(currentChat, { isUserOwner: true, message });
          setMessage("");
        })
        .catch((err) => console.log(err));
    },
    [addMessage, currentChat, id, message, token],
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
                  backgroundColor: el.isUserOwner ? "#d9fdd3" : "white",
                  alignSelf: el.isUserOwner ? "end" : "start",
                }}
              >
                {el.message}
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
