import React, { useCallback } from "react";
import "./style.scss";
import config from "@src/config";

const SwitcherFakeApi = () => {
  const switchFakeApi = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      config.service?.switchUseFakeApi(e.currentTarget.checked);
    },
    [],
  );
  return (
    <div>
      <label>
        use Fake api
        <input onChange={switchFakeApi} type="checkbox" />
      </label>
    </div>
  );
};

export default SwitcherFakeApi;
