import React from "react";
import "./chat-messaging-menu.scss";

interface IChatMessagingMenu {
  currentChat: string;
}

export const ChatMessagingMenu = ({ currentChat }: IChatMessagingMenu) => {
  return <div className="chatMessaging chatMessagingMenu">{currentChat}</div>;
};
