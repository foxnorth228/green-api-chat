import React, { useCallback, useState } from "react";
import "./auth.scss";
import useUser from "@src/hooks/use-user";
import useRedirectAuthUser from "@src/hooks/use-redirect-auth-user";

const Auth = () => {
  useRedirectAuthUser();
  const { setId, setToken } = useUser();
  const [instanse, setInstanse] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [messageErrorInput, setMessageErrorInput] = useState("");
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
          } else if (result.status > 399) {
            return Promise.reject(
              "Something went wrong. " + result.status + " " + result.statusText
            );
          }
          return result.json();
        })
        .then((data) => {
          console.log(data);
          const acceptState = ["authorized", "sleepMode", "starting"];
          if (!acceptState.includes(data!.stateInstance as string)) {
            Promise.reject("This account isn't authorized or got banned");
          }
          setId(instanse);
          setToken(loginToken);
        })
        .catch((err) => {
          setIsWrongInput(true);
          setMessageErrorInput(err);
        });
    },
    [instanse, loginToken, setId, setToken]
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
      )}
    </>
  );
};

export default Auth;
