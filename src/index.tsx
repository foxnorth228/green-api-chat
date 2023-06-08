import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "@pages/app";
const rootNode = document.getElementById("app");
if (rootNode) {
  createRoot(rootNode).render(<App />);
}
