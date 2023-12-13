import App from "@pages/App";
import Auth from "@pages/auth/auth";
import Chat from "@pages/chat/chat";
import ErrorPage from "@pages/error-page/error-page";
import React from "react";

const config = {
  base: {
    path: "/",
    elem: <App />,
  },
  chat: {
    path: "/chat",
    elem: <Chat />,
  },
  login: {
    path: "/login",
    elem: <Auth />,
  },
  boundary: {
    path: "/*",
    elem: <ErrorPage />,
  },
};

export default config;
