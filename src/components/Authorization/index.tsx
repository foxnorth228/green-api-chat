import "./style.scss";

import useRedirectAuthUser from "@hooks/useRedirectAuthUser";
import { useGetUserStatus } from "@store/userSlice/hooks";
import React, { useCallback, useState } from "react";

import config from "./config";

const Authorization = () => {
  useRedirectAuthUser();

  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [messageErrorInput, setMessageErrorInput] = useState("");
  const getUserStatus = useGetUserStatus();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { payload } = await getUserStatus(id, token);
      if (typeof payload === "boolean" && payload) {
        setId("");
        setToken("");
      } else if (typeof payload === "string") {
        setMessageErrorInput(payload);
      }
    },
    [getUserStatus, id, token],
  );

  const onClickResetError = useCallback(() => {
    setMessageErrorInput("");
  }, []);

  const onChangeSetId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.currentTarget.value);
    },
    [],
  );
  const onChangeSetToken = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToken(e.currentTarget.value);
    },
    [],
  );

  return (
    <>
      {messageErrorInput !== "" ? (
        <div className="authorization" onClick={onClickResetError}>
          <p className="authorization__errorDesc">{config.errorMessage1}</p>
          <p className="authorization__errorDesc">{messageErrorInput}</p>
          <p className="authorization__errorDesc">{config.errorMessage2}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="authorization">
          <label className="authorization__inputBlock">
            {config.labelIdTitle}
            <input
              name={config.inputIdName}
              type="text"
              className="authorization__input"
              value={id}
              onChange={onChangeSetId}
              required={true}
            />
          </label>
          <label className="authorization__inputBlock">
            {config.labelTokenTitle}
            <input
              name={config.inputTokenName}
              type="text"
              className="authorization__input"
              value={token}
              onChange={onChangeSetToken}
              required={true}
            />
          </label>
          <button className="authorization__submitButton" type="submit">
            {config.buttonSubmitTitle}
          </button>
        </form>
      )}
    </>
  );
};

export default Authorization;
