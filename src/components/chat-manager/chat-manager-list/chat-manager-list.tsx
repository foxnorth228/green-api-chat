import React, { useCallback, useState } from "react";
import "./chat-manager-list.scss";
import useGreenApi from "@src/hooks/use-green-api";
import useRedirectUnauthUser from "@src/hooks/use-redirect-unauth-user";
import useUser from "@src/hooks/use-user";

export const ChatManagerList = () => {
  useRedirectUnauthUser();
  const { id, token } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(phoneNumber);
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
    [id, phoneNumber, token]
  );
  return (
    <div className="chatManagerList">
      <form className="chatManagerList__form" onSubmit={onSubmit}>
        <input
          className="chatManagerList__phone"
          type="tel"
          placeholder="Phone number..."
          pattern="[0-9]{11,12}"
          onChange={(e) => {
            setPhoneNumber(e.currentTarget.value);
          }}
        />
        <button className="chatManagerList__submit" type="submit" />
      </form>
    </div>
  );
};
