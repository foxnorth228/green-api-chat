import "./style.scss";

import useRedirectAuthUser from "@hooks/useRedirectAuthUser";
import { StoreDispatch } from "@src/store";
import { getUserStatus } from "@store/userSlice/api";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const Authorization = () => {
  useRedirectAuthUser();

  const dispatch = useDispatch<StoreDispatch>();
  const [instance, setInstance] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [messageErrorInput, setMessageErrorInput] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const result = await dispatch(
        getUserStatus({ id: instance, token: loginToken }),
      );
      if (typeof result.payload === "boolean" && result.payload) {
        setInstance("");
        setLoginToken("");
      } else if (typeof result.payload === "string") {
        setMessageErrorInput(result.payload);
      } else if (result.payload instanceof Error) {
        setMessageErrorInput(result.payload.message);
      }
    },
    [dispatch, instance, loginToken],
  );
  return (
    <>
      {messageErrorInput !== "" ? (
        <div
          className="auth"
          onClick={() => {
            setMessageErrorInput("");
          }}
        >
          <p>Your input has some problem</p>
          <p>{messageErrorInput}</p>
          <p>Click this block to return to authorization</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="auth">
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

export default Authorization;
