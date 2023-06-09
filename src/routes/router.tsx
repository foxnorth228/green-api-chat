import Auth from "@pages/auth/auth";
import Chat from "@pages/chat/chat";
import ErrorPage from "@pages/error-page/error-page";
import { App } from "@src/app";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="chat" element={<Chat />} />
      <Route path="register" element={<Auth />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
