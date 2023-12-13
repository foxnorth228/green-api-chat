import App from "@pages/App";
import Auth from "@pages/Auth";
import Chat from "@pages/Chat";
import ErrorPage from "@pages/Error";
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
