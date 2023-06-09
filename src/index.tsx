import React from "react";
import { createRoot } from "react-dom/client";
import router from "@routes/router";
import { RouterProvider } from "react-router-dom";
const rootNode = document.getElementById("app");
if (rootNode) {
  console.log("root");
  createRoot(rootNode).render(<RouterProvider router={router} />);
}
