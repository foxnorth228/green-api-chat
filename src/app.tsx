import React, { useLayoutEffect } from "react";
import "./app.scss";
import { useNavigate, useOutlet } from "react-router-dom";

export const App = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (outlet === null) {
      navigate("/login");
    }
  });
  return <div className="wrapper">{outlet}</div>;
};
