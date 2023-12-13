import "./style.scss";

import config from "@routes/config";
import React, { useLayoutEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

const App = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (outlet === null) {
      navigate(config.login.path);
    }
  });
  return <div className="wrapper">{outlet}</div>;
};

export default App;
