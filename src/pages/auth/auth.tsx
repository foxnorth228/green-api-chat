import React, { useCallback, useState } from "react";
import "./auth.scss";

const Auth = () => {
  const [instanse, setInstanse] = useState("");
  const [token, setToken] = useState("");
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(
        `http://localhost:8081/https://api.green-api.com/waInstance${instanse}/getStateInstance/${token}`
      )
        .then((result) => result.json())
        .then((data) => console.log(data));
    },
    [instanse, token]
  );
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      className="auth"
    >
      <label className="auth__inputblock">
        Идентификатор
        <input
          name="id"
          type="text"
          value={instanse}
          onChange={(e) => {
            setInstanse(e.currentTarget.value);
          }}
        />
      </label>
      <label className="auth__inputblock">
        Токен
        <input
          name="token"
          value={token}
          onChange={(e) => {
            setToken(e.currentTarget.value);
          }}
          type="text"
        />
      </label>
      <button className="auth__submitbutton" type="submit">
        Войти
      </button>
    </form>
  );
};

export default Auth;
