import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "@src/contexts/UserContext";
import "./auth.scss";

const Auth = () => {
  const navigate = useNavigate();
  const { id, setId, token, setToken } = useContext(UserContext);
  console.log(id, token);
  useEffect(() => {
    if (id !== "" && token !== "") {
      navigate("/chat");
    }
  });
  const [instanse, setInstanse] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(
        `https://web-production-29546.up.railway.app/0.0.0.0:8080/https://api.green-api.com/waInstance${instanse}/getStateInstance/${loginToken}`
      )
        .then((result) => {
          if (result.status === 401) {
            return Promise.reject("Your token is incorrect");
          } else if (result.status === 403) {
            return Promise.reject("Your ID is incorrect");
          } else if (result.status > 299) {
            return Promise.reject(
              "Something went wrong. " + result.status + " " + result.statusText
            );
          }
          return result.json();
        })
        .then((data) => {
          setId(instanse);
          setToken(loginToken);
          console.log(data, id, token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [instanse, loginToken, setId, setToken]
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
          value={loginToken}
          onChange={(e) => {
            setLoginToken(e.currentTarget.value);
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
