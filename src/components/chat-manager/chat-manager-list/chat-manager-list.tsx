import React, { useCallback, useState } from "react";
import "./chat-manager-list.scss";
import useRedirectUnauthUser from "@src/hooks/use-redirect-unauth-user";
import useUser from "@src/hooks/use-user";

interface IChatManagerList {
  chats: string[];
  setChats: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
export const ChatManagerList = ({
  chats,
  setChats,
  setCurrentChat,
}: IChatManagerList) => {
  useRedirectUnauthUser();
  const { id, token } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const num = Number(phoneNumber);
      fetch(
        `https://web-production-29546.up.railway.app/` +
          `0.0.0.0:8080/` +
          `https://api.green-api.com/waInstance${id}/checkWhatsapp/${token}`,
        {
          method: "POST",
          body: JSON.stringify({ phoneNumber: num }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data!.existsWhatsapp) {
            setChats([...chats, phoneNumber]);
          }
          setPhoneNumber("");
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
    [chats, id, phoneNumber, setChats, token]
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
        {chats.map((el, i) => (
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
