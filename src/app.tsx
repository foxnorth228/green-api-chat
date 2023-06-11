import React, { useLayoutEffect, useState } from "react";
import "./app.scss";
import { useNavigate, useOutlet } from "react-router-dom";

export const App = () => {
  const [chats, setChats] = useState({});
  const outlet = useOutlet();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (outlet === null) {
      navigate("/login");
    }
  });
  return <div className="wrapper">{outlet}</div>;
};
