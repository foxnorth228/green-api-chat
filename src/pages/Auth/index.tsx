import "./style.scss";

import Authorization from "@components/Authorization";
import React from "react";

const Auth = () => {
  return (
    <section className="auth">
      <Authorization></Authorization>
    </section>
  );
};

export default Auth;
