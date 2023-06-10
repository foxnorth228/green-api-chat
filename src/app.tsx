import React from "react";
import "./app.scss";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};
