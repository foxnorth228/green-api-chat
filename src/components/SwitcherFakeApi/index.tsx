import "./style.scss";

import config from "@src/config";
import React, { useCallback } from "react";

const SwitcherFakeApi = () => {
  const switchFakeApi = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      config.service?.switchUseFakeApi(e.currentTarget.checked);
    },
    [],
  );
  return (
    <article>
      <label className="switcherFakeApi__label">
        Offline mode
        <input onChange={switchFakeApi} type="checkbox" />
      </label>
    </article>
  );
};

export default SwitcherFakeApi;
