import "./chat-messaging-menu.scss";

import React from "react";

interface IChatMessagingMenu {
  currentChat: string;
}

export const ChatMessagingMenu = ({ currentChat }: IChatMessagingMenu) => {
  return (
    <div className="chatMessaging chatMessagingMenu">
      <p className="chatMessagingMenu__name">{currentChat}</p>
    </div>
  );
};
