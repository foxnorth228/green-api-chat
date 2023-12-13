import "./chat-manager-list.scss";

import useRedirectUnauthUser from "@src/hooks/use-redirect-unauth-user";
import { useChats, useChatsAddChat } from "@store/chatsSlice/hooks";
import { useUserData } from "@store/userSlice/hooks";
import React, { useCallback, useState } from "react";

interface IChatManagerList {
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
export const ChatManagerList = ({ setCurrentChat }: IChatManagerList) => {
  useRedirectUnauthUser();
  const [id, token] = useUserData();
  const chats = useChats();
  const addChat = useChatsAddChat();
  const [phoneNumber, setPhoneNumber] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const num = Number(phoneNumber);
      fetch(
        `https://api.green-api.com/waInstance${id}/checkWhatsapp/${token}`,
        {
          method: "POST",
          body: JSON.stringify({ phoneNumber: num }),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data!.existsWhatsapp &&
            !Object.values(chats).includes(data!.existsWhatsapp)
          ) {
            addChat(phoneNumber);
          }
          setPhoneNumber("");
        })
        .catch((err) => console.log(err));
    },
    [addChat, chats, id, phoneNumber, token],
  );
  return (
    <div className="chatManagerList">
      <form className="chatManagerList__form" onSubmit={onSubmit}>
        <input
          name="phone"
          className="chatManagerList__phone"
          type="tel"
          placeholder="Phone number..."
          pattern="[0-9]{11,12}"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.currentTarget.value);
          }}
        />
        <button className="chatManagerList__submit" type="submit" />
      </form>
      <div>
        {Object.keys(chats).map((el, i) => (
          <div
            key={i}
            className="chatManagerList__elem"
            onClick={() => {
              setCurrentChat(el);
            }}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};
