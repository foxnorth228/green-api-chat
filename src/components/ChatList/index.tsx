import "./style.scss";

import { useChats } from "@store/chatsSlice/hooks";
import { useGetContacts } from "@store/contactsSlice/hooks";
import React from "react";

import { IChatList } from "./types";

const ChatList = ({ chat, setCurrentChat }: IChatList) => {
  const chats = useChats();
  const contacts = useGetContacts();
  return (
    <div className="chatList">
      {Object.keys(chats).map((el) => {
        const phone = el;
        const contact = contacts[el] ?? { avatar: "" };
        return (
          <div
            key={phone}
            className={`chatList__item ${
              phone === chat ? "chatList__item_selected" : ""
            }`}
            onClick={() => {
              setCurrentChat(phone);
            }}
          >
            <img
              alt="contact avatar"
              src={
                contact.avatar !== "" ? contact.avatar : "./defaultavatar.jpg"
              }
              className="chatList__avatar"
            />
            <span>{contact?.name ?? phone}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
