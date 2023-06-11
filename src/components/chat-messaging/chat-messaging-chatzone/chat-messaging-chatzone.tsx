import React from "react";
import "./chat-messaging-chatzone.scss";

interface IChatManagerList {
  currentChat: string;
}

export const ChatMessagingChatzone = ({ currentChat }: IChatManagerList) => {
  return <div className="chatMessaging chatMessagingChatzone"></div>;
};
