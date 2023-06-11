import React from "react";
import "./chat-manager-menu.scss";

export const ChatManagerMenu = () => {
  return (
    <div className="chatManagerMenu">
      <p style={{ fontSize: "12px" }}>
        Input new phone number(11-12 symbols). It should be specified in full,
        with the country code, without spaces, dashes, pluses and any other
        symbols, only digits
      </p>
    </div>
  );
};
