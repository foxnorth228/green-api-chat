import router from "@routes/router";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import ChatContext from "./contexts/ChatContext";
import UserContext from "./contexts/UserContext";

const rootNode = document.getElementById("app");

const Root = () => {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [chats, setChats] = useState({});
  const value = { id, setId, token, setToken };
  return (
    <UserContext.Provider value={value}>
      <ChatContext.Provider value={{ chats, setChats }}>
        <RouterProvider router={router} />
      </ChatContext.Provider>
    </UserContext.Provider>
  );
};

if (rootNode) {
  createRoot(rootNode).render(<Root />);
}
