import config from "@routes/config";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const { base, chat, login, boundary } = config;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base.path} element={base.elem}>
      <Route path={chat.path} element={chat.elem} />
      <Route path={login.path} element={login.elem} />
      <Route path={boundary.path} element={boundary.elem} />
    </Route>,
  ),
);

export default router;
