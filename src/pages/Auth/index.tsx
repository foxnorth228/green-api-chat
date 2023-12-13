import "./style.scss";

import useRedirectAuthUser from "@hooks/useRedirectAuthUser";
import { useUserId, useUserToken } from "@store/userSlice/hooks";
import React, { useCallback, useState } from "react";

const Auth = () => {
  useRedirectAuthUser();
  const [, setId] = useUserId();
  const [, setToken] = useUserToken();
  const [instance, setInstance] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [messageErrorInput, setMessageErrorInput] = useState("");
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(
        `https://api.green-api.com/waInstance${instance}/getStateInstance/${loginToken}`,
      )
        .then((result) => {
          if (result.status === 401) {
            return Promise.reject("Your token is incorrect");
          } else if (result.status === 403) {
            return Promise.reject("Your ID is incorrect");
          } else if (result.status > 399) {
            return Promise.reject(
              "Something went wrong. " +
                result.status +
                " " +
                result.statusText,
            );
          }
          return result.json();
        })
        .then((data) => {
          const acceptState = ["authorized", "sleepMode", "starting"];
          if (!acceptState.includes(data!.stateInstance as string)) {
            Promise.reject("This account isn't authorized or got banned");
          }
          console.log(instance);
          setId(instance);
          setToken(loginToken);
        })
        .catch((err) => {
          setIsWrongInput(true);
          setMessageErrorInput(err);
        });
    },
    [instance, loginToken, setId, setToken],
  );
  return (
    <>
      {isWrongInput ? (
        <div
          className="auth"
          onClick={() => {
            setIsWrongInput(false);
          }}
        >
          <p>Your input has some problem</p>
          <p>{messageErrorInput}</p>
          <p>Click this block to return to authorization</p>
        </div>
      ) : (
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
              value={instance}
              onChange={(e) => {
                setInstance(e.currentTarget.value);
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
      )}
    </>
  );
};

export default Auth;
