import React from "react";
import "./app.scss";
import Chat from "@layouts/chat/chat";

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Chat />
    </div>
  );
};
