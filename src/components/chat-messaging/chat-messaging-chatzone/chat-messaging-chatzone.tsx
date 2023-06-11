import React, { useCallback, useState } from "react";
import "./chat-messaging-chatzone.scss";
import useUser from "@src/hooks/use-user";

interface IChatManagerList {
  currentChat: string;
}

export const ChatMessagingChatzone = ({ currentChat }: IChatManagerList) => {
  const { id, token } = useUser();
  const [messages, setMessages] = useState<Array<[boolean, string]>>([]);
  const [message, setMessage] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(
        `https://web-production-29546.up.railway.app/` +
          `0.0.0.0:8080/` +
          `https://api.green-api.com/waInstance${id}/sendMessage/${token}`,
        {
          method: "POST",
          body: JSON.stringify({
            chatId: `${currentChat}@c.us`,
            message: message,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages([...messages, [true, message]]);
          setMessage("");
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
    [currentChat, id, message, messages, token]
  );
  return (
    <div className="chatMessaging chatMessagingChatzone">
      {currentChat !== "" && (
        <>
          <div className="chatMessagingChatzone__messages">
            {messages.map((el, i) => (
              <div
                key={i}
                className="chatMessagingChatzone__message"
                style={{
                  backgroundColor: el[0] ? "green" : "white",
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
