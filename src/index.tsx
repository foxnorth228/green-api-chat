import router from "@routes/router";
import store from "@src/store";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

const rootNode = document.getElementById("app");

if (rootNode) {
  createRoot(rootNode).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}
