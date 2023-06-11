import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import router from "@routes/router";
import { RouterProvider } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import ChatContext from "./contexts/ChatContext";

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
  console.log("root");
  createRoot(rootNode).render(<Root />);
}
